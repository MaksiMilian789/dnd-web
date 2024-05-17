import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GENDER_LOCALIZATION, Gender, IDEOLOGY_LOCALIZATION, Ideology } from '@core/enums';
import { Character } from '@core/models';
import { Characteristics } from '@core/models/character/characteristics.model';
import { CharacterService } from '@core/services/api/character.service';
import { UploadService } from '@core/services/api/upload.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface CharInfoDialogData {
  character: Character;
}

@Component({
  selector: 'app-char-info-dialog',
  templateUrl: './char-info-dialog.component.html',
  styleUrl: './char-info-dialog.component.scss',
})
export class CharInfoDialogComponent {
  protected character: Character;
  form: FormGroup;

  edit: boolean = false;

  name = new FormControl('', { nonNullable: true, validators: Validators.required });
  level = new FormControl(0, { nonNullable: true, validators: Validators.required });
  age = new FormControl(0, { nonNullable: true, validators: Validators.required });

  loading: boolean = false;

  img: FormControl = new FormControl();
  readonly loadedFiles$ = this.img.valueChanges.subscribe((val) => {
    this.uploadFile(val);
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean, CharInfoDialogData>,
    private _characterService: CharacterService,
    private _uploadService: UploadService,
    private _snackbar: MatSnackBar,
  ) {
    this.character = context.data.character;
    this.name.setValue(this.character.name);
    this.level.setValue(this.character.level);
    this.age.setValue(this.character.age);

    this.form = new FormGroup({
      imageId: new FormControl(this.character.imageId),
    });
  }

  close(): void {
    this.context.completeWith(false);
  }

  editable(): void {
    this.edit = true;
  }

  save(): void {
    this._characterService
      .editCharacterInfo(this.character.id!, this.name.value, this.level.value, this.age.value,  this.form.controls['imageId'].value)
      .subscribe(() => {
        this.context.completeWith(true);
      });
  }

  imageUrl(): string {
    return this._uploadService.url(this.character.imageId ?? 0);
  }

  removeFile(): void {
    this.form.controls['imageId'].setValue(null);
  }

  hasImage(): boolean {
    return this.form.controls['imageId'].value;
  }

  removeImage(): void {
    this.form.patchValue({ imageId: null });
    this.img.reset();
    this.loading = false;
  }

  private uploadFile(file: File): any {
    if (file.size >= 10 * 1024 * 1024) {
      this._snackbar.open('Превышен максимальный размер файла');
      return;
    }
    this.loading = true;
    this._uploadService.upload(file).subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        this._snackbar.open('Изображение загружено');
        this.form.patchValue({ imageId: event.body });
        this.loading = false;
      }
    });
  }

  get localizeGender(): string {
    return GENDER_LOCALIZATION[this.character.gender];
  }

  get localizeIdeology(): string {
    return IDEOLOGY_LOCALIZATION[this.character.ideology];
  }
  
  get image(): string | undefined {
    return `${this.imageUrl()}`;
  }
}

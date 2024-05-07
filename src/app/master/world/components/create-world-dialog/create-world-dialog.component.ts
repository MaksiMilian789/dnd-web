import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';
import { UploadService } from '@core/services/api/upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-world-dialog',
  templateUrl: './create-world-dialog.component.html',
  styleUrl: './create-world-dialog.component.scss',
})
export class CreateWorldDialogComponent {
  form: FormGroup;

  loading: boolean = false;

  img: FormControl = new FormControl();
  readonly loadedFiles$ = this.img.valueChanges.subscribe((val) => {
    this.uploadFile(val);
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean>,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _worldService: WorldService,
    private _uploadService: UploadService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageId: new FormControl(null),
    });
  }

  create(): void {
    this._worldService
      .createWorld(
        this._authService.currentUser?.id!,
        this.form.controls['name'].value,
        this.form.controls['description'].value,
        this.form.controls['imageId'].value,
      )
      .subscribe(() => {
        this._snackbar.open('Создание мира успешно.');
        this.context.completeWith(true);
      });
  }

  close(): void {
    this.context.completeWith(false);
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
}

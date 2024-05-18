import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogService } from '@taiga-ui/core';
import { Observable, tap } from 'rxjs';

import { WorldService } from '@core/services/api/world.service';
import { ShortWorld, World } from '@core/models';
import { OpenImageDialogComponent, OpenImageDialogData } from '../open-image-dialog/open-image-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { HttpEventType } from '@angular/common/http';
import { UploadService } from '@core/services/api/upload.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
})
export class WorldComponent {
  public role: string = '';
  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));
  world$: Observable<World>;
  form: FormGroup;

  edit: boolean = false;
  loading: boolean = false;

  img: FormControl = new FormControl();
  readonly loadedFiles$ = this.img.valueChanges.subscribe((val) => {
    this.uploadFile(val);
  });

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _worldService: WorldService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageId: new FormControl(null),
    });

    this.role = this._router.url.split('/')[1];
    this.world$ = this._worldService.loadWorld(this.worldId).pipe(
      tap((val) => {
        this.form.setValue({
          name: val.name,
          description: val.description,
          imageId: val.imageId,
        });
      }),
    );
  }

  editChange(currentWorld: World): void {
    if (this.edit) {
      this.form.setValue({
        name: currentWorld.name,
        description: currentWorld.description,
      });
    }
    this.edit = !this.edit;
  }

  save(currentWorld: World): void {
    let world: World = {
      id: currentWorld.id,
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      imageId: this.form.controls['imageId'].value,
    };
    this._worldService.editWorld(world).subscribe(() => {
      this._snackbar.open('Сохранение успешно');
      this.edit = false;
      this.world$ = this._worldService.loadWorld(this.worldId).pipe(
        tap((val) => {
          this.form.setValue({
            name: val.name,
            description: val.description,
            imageId: val.imageId,
          });
        }),
      );
    });
  }

  hasMap(currentWorld: World): boolean {
    return currentWorld.imageId ? true : false;
  }

  openMap(imageId: number): void {
    let data: OpenImageDialogData = {
      imageId: imageId,
    };
    this._dialogs
      .open<boolean>(new PolymorpheusComponent(OpenImageDialogComponent), {
        data: data,
        size: 'page',
        closeable: true,
      })
      .subscribe();
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

  get rows(): number {
    return Math.floor(window.innerHeight / 70);
  }
}

import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadService } from '@core/services/api/upload.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface OpenImageDialogData {
  imageId: number;
}

@Component({
  selector: 'app-open-image-dialog',
  templateUrl: './open-image-dialog.component.html',
  styleUrl: './open-image-dialog.component.scss',
})
export class OpenImageDialogComponent {
  form: FormGroup;

  minHeight: number = 10;
  minWidth: number = 10;
  maxHeight: number = 10;
  maxWidth: number = 10;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<number | null, OpenImageDialogData>,
    private _uploadService: UploadService,
  ) {
    this.form = new FormGroup({
      height: new FormControl(0),
      width: new FormControl(0),
    });

    this.fillSizeFromImage();
  }

  close(): void {
    this.context.completeWith(null);
  }

  imageUrl(): string {
    return this._uploadService.url(this.context.data.imageId);
  }

  fillSizeFromImage(): void {
    const img = new Image();
    img.src = this._uploadService.url(this.context.data.imageId);
    img.onload = () => {
      this.form.patchValue({ width: img.naturalWidth, height: img.naturalHeight });
      this.maxHeight = img.naturalHeight;
      this.maxWidth = img.naturalWidth;
      this.minHeight = img.naturalHeight / 5;
      this.minWidth = img.naturalWidth / 5;
    };
  }

  max(): boolean {
    return this.form.controls['width'].value == this.maxWidth || this.form.controls['height'].value == this.maxHeight;
  }

  min(): boolean {
    return this.form.controls['width'].value == this.minWidth || this.form.controls['height'].value == this.minHeight;
  }

  minus(): void {
    if (
      this.form.controls['width'].value * 0.9 < this.minWidth ||
      this.form.controls['height'].value * 0.9 < this.minHeight
    ) {
      this.form.patchValue({
        width: this.minWidth,
        height: this.minHeight,
      });
    } else {
      this.form.patchValue({
        width: this.form.controls['width'].value * 0.9,
        height: this.form.controls['height'].value * 0.9,
      });
    }
  }

  plus(): void {
    if (
      this.form.controls['width'].value * 1.1 > this.maxWidth ||
      this.form.controls['height'].value * 1.1 > this.maxHeight
    ) {
      this.form.patchValue({
        width: this.maxWidth,
        height: this.maxHeight,
      });
    } else {
      this.form.patchValue({
        width: this.form.controls['width'].value * 1.1,
        height: this.form.controls['height'].value * 1.1,
      });
    }
  }

  get image(): string | undefined {
    return `${this.imageUrl()}`;
  }
}

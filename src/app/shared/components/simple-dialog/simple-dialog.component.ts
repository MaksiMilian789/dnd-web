import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Конфигурация для диалогового окна подтверждения.
 */
export interface SimpleDialogData {
  /** Заголовок окна. */
  title: string;

  /** Описание действия. */
  text?: string;

  /** Текст кнопки подтверждения. По умолчанию: `ОК`. */
  actionText?: string;

  /** Цвет кнопки подтверждения. */
  actionColor?: ThemePalette;
}

/**
 * Диалоговое окно подтверждения действия.
 */
@Component({
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss'],
})
export class SimpleDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData,
    private sanitizer: DomSanitizer
  ) {
    data.actionText = data.actionText ?? 'Ок';
  }

  protected get bypassedText(): SafeHtml | null {
    return this.data.text != null
      ? this.sanitizer.bypassSecurityTrustHtml(this.data.text)
      : null;
  }
}

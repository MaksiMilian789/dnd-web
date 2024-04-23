import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Конфигурация для диалогового окна подтверждения.
 */
export interface ConfirmationDialogData {
  /** Заголовок окна. */
  title: string;

  /** Описание действия. */
  text?: string;

  /** Текст кнопки подтверждения. По умолчанию: `ОК`. */
  actionText?: string;

  /** Цвет кнопки подтверждения. */
  actionColor?: ThemePalette;

  /** Текст кнопки отмены. По умолчанию: `Отмена`. */
  cancelText?: string;
}

/**
 * Диалоговое окно подтверждения действия.
 */
@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData,
    private sanitizer: DomSanitizer
  ) {
    data.actionText = data.actionText ?? 'Ок';
    data.cancelText = data.cancelText ?? 'Отмена';
  }

  protected get bypassedText(): SafeHtml | null {
    return this.data.text != null
      ? this.sanitizer.bypassSecurityTrustHtml(this.data.text)
      : null;
  }
}

import { Component, input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  id = input<number | null>();

  text = new FormControl<string>('', Validators.required);

  edit: boolean = false;

  editorConfig: AngularEditorConfig = {
    editable: false,
    minHeight: 'calc(100vh - 400px)',
    maxHeight: 'calc(100vh - 400px)',
    width: '85vw',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Введите текст заметки...',
    toolbarHiddenButtons: [[], ['insertImage', 'insertVideo']],
  };

  constructor() {
    if (!this.id()) {
      this.edit = true;
      this.enableEditor();
    } else {
      this.disableEditor();
    }
  }

  editorButtonClick(): void {
    if (this.edit) {
      this.disableEditor();
    } else {
      this.enableEditor();
    }
    this.edit = !this.edit;
  }

  enableEditor(): void {
    this.editorConfig.showToolbar = true;
    this.editorConfig.minHeight = 'calc(100vh - 400px)';
    this.editorConfig.minHeight = 'calc(100vh - 400px)';
    this.editorConfig.editable = true;
  }

  disableEditor(): void {
    this.editorConfig.showToolbar = false;
    this.editorConfig.minHeight = 'calc(100vh - 350px)';
    this.editorConfig.minHeight = 'calc(100vh - 350px)';
    this.editorConfig.editable = false;
  }
}

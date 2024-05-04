import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode } from '@angular/material/sidenav';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subject, switchMap, tap } from 'rxjs';

import { PwaService } from 'src/app/shared/services/pwa-service.service';
import { Character } from '@core/models';
import { Note } from '@core/models/character/note.model';
import { CharacterService } from '@core/services/api/character.service';
import { AuthService } from '@core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  drawlerMode: MatDrawerMode = 'side';
  openDrawer: boolean = false;

  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null>;

  noteId: number | null = null;
  notes: Note[] = [];
  create: boolean = false;

  private readonly _refresh$ = new Subject<void>();

  header = new FormControl<string>('', Validators.required);
  text = new FormControl<string>('', Validators.required);

  edit: boolean = false;

  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: false,
    minHeight: 'calc(100vh - 480px)',
    maxHeight: 'calc(100vh - 480px)',
    width: '90vw',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Введите текст заметки...',
    toolbarHiddenButtons: [[], ['insertImage', 'insertVideo']],
  };

  constructor(
    public pwa: PwaService,
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    if (pwa.modalPwaPlatform == 'ANDROID') this.drawlerMode = 'over';

    this.character = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._characterService.loadCharacter(this.charId)),
        tap((val) => (this.notes = val.note)),
      ),
      {
        initialValue: null,
      },
    );
    this.refresh();
  }

  refresh(): void {
    this._refresh$.next();
  }

  selectNote(note: Note): void {
    this.create = false;
    this.edit = false;
    this.disableEditor();
    this.noteId = note.id;
    this.text.setValue(note.text);
    this.header.setValue(note.header);
  }

  addNote(): void {
    this.create = true;
    this.edit = true;
    this.enableEditor();
    this.noteId = null;
    this.text.reset();
    this.header.reset();
  }

  editorButtonClick(): void {
    if (this.edit) {
      this.disableEditor();
      this._characterService
        .saveNote(this.charId, this.header.value!, this.text.value!, null, this.noteId)
        .subscribe(() => {
          this.refresh();
          if (this.create) {
            this.create = false;
          }
          this._snackbar.open('Создание заметки успешно. Можете выбрать её в меню слева.');
        });
    } else {
      this.enableEditor();
    }
    this.edit = !this.edit;
  }

  canSave(): boolean {
    if (this.create || this.noteId) {
      if (this.text.valid && this.header.valid) {
        return true;
      }
      return false;
    }
    return true;
  }

  enableEditor(): void {
    this.editorConfig.showToolbar = true;
    this.editorConfig.minHeight = 'calc(100vh - 480px)';
    this.editorConfig.minHeight = 'calc(100vh - 480px)';
    this.editorConfig.editable = true;
  }

  disableEditor(): void {
    this.editorConfig.showToolbar = false;
    this.editorConfig.minHeight = 'calc(100vh - 370px)';
    this.editorConfig.minHeight = 'calc(100vh - 370px)';
    this.editorConfig.editable = false;
  }
}

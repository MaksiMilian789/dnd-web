import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, tap } from 'rxjs';

import { PwaService } from 'src/app/shared/services/pwa-service.service';
import { Character } from '@core/models';
import { Note } from '@core/models/character/note.model';
import { CharacterService } from '@core/services/api/character.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-notes-shell',
  templateUrl: './notes-shell.component.html',
  styleUrl: './notes-shell.component.scss',
})
export class NotesShellComponent {
  drawlerMode: MatDrawerMode = 'side';
  openDrawer: boolean = false;

  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null>;

  noteId: number | null = null;
  notes: Note[] = [];
  create: boolean = false;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    public pwa: PwaService,
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
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

  addNote(): void {
    this.create = true;
  }
}

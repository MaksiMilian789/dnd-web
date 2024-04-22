import { AfterContentInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog';
import { ShortCharacter } from '@core/models/character/character.model';
import { AddCharacterCacheService } from '../add-character/add-character-cache.service';
import { AuthService } from '@core/services/auth/auth.service';
import { CharacterService } from '@core/services/api/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements AfterContentInit {
  shortCharacters$!: Observable<ShortCharacter[]>;

  public isSelectionModeEnabled: boolean = false;

  private _selectedItems = new Set<ShortCharacter>();

  userId: number;

  constructor(
    private _characterService: CharacterService,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _cacheService: AddCharacterCacheService
  ) {
    this.userId = _auth.currentUser?.id ?? 0;
    this.shortCharacters$ = this._characterService.loadShortCharacters(this.userId);
  }

  ngAfterContentInit(): void {
    this.shortCharacters$ = this._characterService.loadShortCharacters(this.userId);
  }

  enableSelectionMode(): void {
    this.isSelectionModeEnabled = true;
  }

  disableSelectionMode(): void {
    this.isSelectionModeEnabled = false;
    this._selectedItems.clear();
  }

  get canDelete(): boolean {
    const selected = [...this._selectedItems];
    return selected.length > 0;
  }

  isItemSelected(character: ShortCharacter): boolean {
    return this._selectedItems.has(character);
  }

  toggleSelection(character: ShortCharacter): void {
    if (this._selectedItems.has(character)) {
      this._selectedItems.delete(character);
    } else {
      this._selectedItems.add(character);
    }
  }

  deleteSelectedItems(): void {
    /*let ids: number[] = [];
    this._selectedItems.forEach((element) => {
      ids.push(element.id as number);
    });
    this._characterService.deleteCharacters(ids).subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
        this.shortCharacters$ = this._characterService.loadShortCharacters(this.userId);
        this.disableSelectionMode();
      },
    });*/
  }

  addCharacter(): void {
    this._dialog
      .open(SimpleDialogComponent, {
        data: {
          title: 'Инструкция',
          text: 'Вы начали создание своего персонажа. Создание происходит в 4 этапа. Переключаться между этапами можно используя кнопки навигации в нижнем тулбаре.',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        this._cacheService.reload();
        if (res) this._router.navigate(['/player/createCharacterName']);
      });
  }
}

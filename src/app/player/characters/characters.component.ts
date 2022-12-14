import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/shared';
import { SimpleDialogComponent } from 'src/app/shared/components/simple-dialog';
import { ShortCharacter } from 'src/app/shared/models/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  shortCharacters$!: Observable<ShortCharacter[]>;

  public isSelectionModeEnabled: boolean = false;

  private _selectedItems = new Set<ShortCharacter>();

  userLogin: string = '';

  constructor(
    private _http: HttpService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    if (sessionStorage.getItem('auth') != null) {
      // Получение информации о пользователе
      this.userLogin = sessionStorage.getItem('auth') as string;
      this.shortCharacters$ = this._http.loadShortCharacters(this.userLogin);
    }
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
    console.log(this._selectedItems);
  }

  addCharacter(): void {
    this._dialog
      .open(SimpleDialogComponent, {
        data: {
          title: 'Инструкция',
          text: 'Вы начали создание своего персонажа. Создание происходит в 4 этапа. Переключаться между этапами можно используя кнопки навигации в тулбаре.',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this._router.navigate(['/player/createCharacterName']);
      });
  }
}

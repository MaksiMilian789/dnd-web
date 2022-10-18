import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/shared';
import { ShortCharacter } from 'src/app/shared/models/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  shortCharacters$: Observable<ShortCharacter[]> =
    this._http.loadShortCharacters('maksim');

  public isSelectionModeEnabled: boolean = false;

  private _selectedItems = new Set<ShortCharacter>();

  constructor(private _http: HttpService) {}

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
    console.log("kk")
    if (this._selectedItems.has(character)) {
      this._selectedItems.delete(character);
    } else {
      this._selectedItems.add(character);
    }
    console.log(this._selectedItems);
  }

  deleteSelectedItems(): void {
    console.log(this._selectedItems);
  }
}

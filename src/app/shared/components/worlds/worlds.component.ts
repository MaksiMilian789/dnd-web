import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ShortWorld } from '../../models/world';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.scss']
})
export class WorldsComponent{
  shortWorlds$: Observable<ShortWorld[]> =
    this._http.loadShortWorlds('maksim');

public isSelectionModeEnabled: boolean = false;

private _selectedItems = new Set<ShortWorld>();

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

isItemSelected(world: ShortWorld): boolean {
  return this._selectedItems.has(world);
}

toggleSelection(world: ShortWorld): void {
  if (this._selectedItems.has(world)) {
    this._selectedItems.delete(world);
  } else {
    this._selectedItems.add(world);
  }
}

deleteSelectedItems(): void {
  console.log(this._selectedItems);
}
}

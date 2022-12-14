import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ShortWorld } from '../../models/world';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.scss']
})
export class WorldsComponent{
  shortWorlds$!: Observable<ShortWorld[]>;

public isSelectionModeEnabled: boolean = false;

private _selectedItems = new Set<ShortWorld>();

public role: string = "";

userLogin: string = '';

constructor(private _http: HttpService, private _router: Router) {
  this.role = this._router.url.split('/')[1];

  if (sessionStorage.getItem('auth') != null) {
    // Получение информации о пользователе
    this.userLogin = sessionStorage.getItem('auth') as string;
    this.shortWorlds$ = this._http.loadShortWorlds(this.userLogin);
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

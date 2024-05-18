import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogService } from '@taiga-ui/core';
import { Observable } from 'rxjs';

import { WorldService } from '@core/services/api/world.service';
import { ShortWorld } from '@core/models';
import { AuthService } from '@core/services/auth/auth.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CreateWorldDialogComponent } from 'src/app/master/world/components/create-world-dialog/create-world-dialog.component';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.scss'],
})
export class WorldsComponent {
  shortWorlds$!: Observable<ShortWorld[]>;

  public isSelectionModeEnabled: boolean = false;

  private _selectedItems = new Set<ShortWorld>();

  public role: string = '';

  userId: number;

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _worldService: WorldService,
    private _auth: AuthService,
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) {
    this.role = this._router.url.split('/')[1];
    // Получение информации о пользователе
    this.userId = _auth.currentUser?.id ?? 0;
    this.shortWorlds$ = this._worldService.loadShortWorlds(this.userId, 0);
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
    /*let ids: number[] = [];
    this._selectedItems.forEach((element) => {
      ids.push(element.id as number);
    });
    this._http.deleteWorlds(ids).subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
        this.shortWorlds$ = this._http.loadShortWorlds(this.userLogin);
        this.disableSelectionMode();
      },
    });*/
  }

  addWorld(): void {
    this._dialogs
      .open<boolean>(new PolymorpheusComponent(CreateWorldDialogComponent), {
        size: 'page',
        closeable: true,
      })
      .subscribe({
        complete: () => {
          this.shortWorlds$ = this._worldService.loadShortWorlds(this.userId, 0);
        },
      });
  }

  getRoute(id: number): any[] {
    if(this.role != 'master'){
      return ['/player/world', id];
    }

    console.log(this._router.url.split('/').pop())
    if(this._router.url.split('/').pop() == 'access-players'){
      return ['/master/access-players/rights', id];
    }
    
    return ['/master/world', id];
  }
}

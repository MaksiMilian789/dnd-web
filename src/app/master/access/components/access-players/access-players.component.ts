import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';

import { ROLE_LOCALIZATION, Role } from '@core/enums';
import { UserRole } from '@core/models/user-role.model';
import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared/index';

@Component({
  selector: 'app-access-players',
  templateUrl: './access-players.component.html',
  styleUrls: ['./access-players.component.scss'],
})
export class AccessPlayersComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));
  hasChanges: boolean = false;

  dataSource!: MatTableDataSource<UserRole>;
  columnsToDisplay = ['name', 'role'];

  filter: string = '';

  selection = new SelectionModel<UserRole>(true);
  constructor(
    private _worldService: WorldService,
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
  ) {
    _worldService.getRolesForWorld(this.worldId).subscribe((val) => {
      this.setData(val);
    });
  }

  applyTextFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  setData(data: UserRole[]): void {
    const userId = this._auth.currentUser?.id ?? 0;
    data = data.filter((val) => val.id != userId);

    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Пользователей на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  save(): void {
    this._worldService.setRolesForWorld(this.worldId, this.dataSource.data).subscribe(() => {
      this.hasChanges = false;
      this._snackbar.open('Изменения сохранены');
    });
  }

  changeRole(element: UserRole): void {
    this.hasChanges = true;
    if (element.role == null) {
      element.role = Role.Player;
      return;
    }

    if (element.role == Role.Master) {
      element.role = null;
      return;
    }

    if (element.role == Role.Player) {
      element.role = Role.Master;
      return;
    }
  }

  @tuiPure
  protected stringifyRole(value: Role | null): string {
    return value != null ? ROLE_LOCALIZATION[value] : 'Нет доступа';
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShortWorld } from '../../../core/models/world.model';
import { HttpService } from '../../../core/services/api/world.service';
import { EditWorldDialogComponent } from './edit-world-dialog/edit-world-dialog.component';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
})
export class WorldComponent {
  public role: string = '';
  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));
  world$: Observable<ShortWorld>;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.role = this._router.url.split('/')[1];
    this.world$ = this._http.loadWorld(this.worldId);
  }

  editWorld(world: ShortWorld): void {
    this._dialog
      .open(EditWorldDialogComponent, {
        data: {
          id: this.worldId,
          name: world.name,
          description: world.description,
        },
        width: '300px',
      })
      .afterClosed()
      .subscribe(() => (this.world$ = this._http.loadWorld(this.worldId)));
  }
}

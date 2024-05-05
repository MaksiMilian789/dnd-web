import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { WorldService } from '@core/services/api/world.service';
import { ShortWorld, World } from '@core/models';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
})
export class WorldComponent {
  public role: string = '';
  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));
  world$: Observable<World>;
  form: FormGroup;

  edit: boolean = false;

  constructor(
    private _worldService: WorldService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.role = this._router.url.split('/')[1];
    this.world$ = this._worldService.loadWorld(this.worldId).pipe(
      tap((val) => {
        this.form.setValue({
          name: val.name,
          description: val.description,
        });
      }),
    );
  }

  editChange(currentWorld: World): void {
    if (this.edit) {
      this.form.setValue({
        name: currentWorld.name,
        description: currentWorld.description,
      });
    }
    this.edit = !this.edit;
  }

  save(currentWorld: World): void {
    let world: World = {
      id: currentWorld.id,
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
    };
    this._worldService.editWorld(world).subscribe(() => {
      this._snackbar.open('Сохранение успешно');
    });
  }
}

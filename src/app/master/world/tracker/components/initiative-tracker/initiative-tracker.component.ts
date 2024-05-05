import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { WorldService } from '@shared/index';

import { TrackerUnit } from 'src/app/core/models/tracker-unit.model';
import { CreateTrackerUnitDialogComponent } from '../create-tracker-unit-dialog/create-tracker-unit-dialog.component';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.scss'],
})
export class InitiativeTrackerComponent {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  units: TrackerUnit[] = [];
  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _worldService: WorldService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
  ) {
    this._worldService.getTracker(this.worldId).subscribe((res) => (this.units = res.trackerUnitDto));
  }

  sort(): void {
    this.units.sort((a, b) => parseInt(b.initiative) - parseInt(a.initiative));
    this.virtualScroll.scrollToIndex(0);
  }

  next(): void {
    let temp = this.units[0];
    this.units.shift();
    if (temp) this.units = [...this.units, temp];
  }

  remove(unit: TrackerUnit): void {
    this.units = this.units.filter((val) => val != unit);
    this._worldService.setTracker(this.worldId, this.units).subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
      },
    });
  }

  add(): void {
    this._dialogs
      .open(new PolymorpheusComponent(CreateTrackerUnitDialogComponent), {
        size: 'page',
        closeable: true,
      })
      .subscribe({
        complete: () => {
          
        },
      });
        /*if (val != false) {
          console.log( this.units)
          this.units.push(val as TrackerUnit);
          console.log( this.units)
          this._worldService.setTracker(this.worldId, this.units).subscribe({
            complete: () => {
              this._snackbar.open('Добавление успешно.');
            },
          });
        }*/
  }
}

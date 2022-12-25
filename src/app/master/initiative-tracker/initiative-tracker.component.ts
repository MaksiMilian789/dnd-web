import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared';
import { TrackerUnit } from 'src/app/shared/models/tracker-unit';
import { AddTrackerDialogComponent } from './add-tracker-dialog/add-tracker-dialog.component';

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
    private _dialog: MatDialog,
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {
    this._http.getTracker(this.worldId).subscribe((res) => (this.units = res));
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
    this._http.setTracker(this.worldId, this.units).subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
      },
    });
  }

  add(): void {
    this._dialog
      .open(AddTrackerDialogComponent, { width: '300px' })
      .afterClosed()
      .subscribe((res: TrackerUnit) => {
        if (res) this.units.push(res);
        this._http.setTracker(this.worldId, this.units).subscribe({
          complete: () => {
            this._snackbar.open('Добавление успешно.');
          },
        });
      });
  }
}

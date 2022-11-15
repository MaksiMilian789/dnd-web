import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unit } from 'src/app/shared/models/unit';
import { AddTrackerDialogComponent } from './add-tracker-dialog/add-tracker-dialog/add-tracker-dialog.component';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.scss'],
})
export class InitiativeTrackerComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  units: Unit[] = [];

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.units = [
      { name: 'Варвар', initiative: '10', color: 'green' },
      { name: 'Лучник', initiative: '20', color: 'green' },
      { name: 'Воин чемпион союзник', initiative: '12', color: 'yellow' },
      { name: 'Слизь', initiative: '3', color: 'red' },
      { name: 'Мара', initiative: '12', color: 'green' },
      { name: 'Элейна Лиадон', initiative: '13', color: 'green' },
      { name: 'Гоблин', initiative: '18', color: 'red' },
      { name: 'Алазар', initiative: '8', color: 'green' },
      { name: 'Маг союзник', initiative: '7', color: 'yellow' },
    ];
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

  remove(unit: Unit): void {
    this.units = this.units.filter((val) => val != unit);
  }

  add(): void {
    this._dialog
      .open(AddTrackerDialogComponent, { width: '300px' })
      .afterClosed()
      .subscribe((res: Unit) => {
        if (res) this.units.push(res);
      });
  }
}

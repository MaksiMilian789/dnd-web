import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unit } from 'src/app/shared/models/unit';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.scss'],
})
export class InitiativeTrackerComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  
  units: Unit[] = [];

  constructor() {}

  ngOnInit(): void {
    this.units = [
      { name: 'Варвар', initiative: '10', color: 'green' },
      { name: 'Лучник', initiative: '20', color: 'green' },
      { name: 'Воин союзник', initiative: '12', color: 'yellow' },
      { name: 'Слизь', initiative: '3', color: 'red' },
      { name: 'Мара', initiative: '12', color: 'green' },
      { name: 'Элейна', initiative: '13', color: 'green' },
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
}

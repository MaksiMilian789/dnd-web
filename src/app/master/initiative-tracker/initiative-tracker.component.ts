import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/shared/models/unit';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.scss'],
})
export class InitiativeTrackerComponent implements OnInit {
  units: Unit[] = [];

  constructor() {}

  ngOnInit(): void {
    this.units = [
      { name: 'Варвар', initiative: '10', color: 'green' },
      { name: 'Лучник', initiative: '20', color: 'green' },
      { name: 'Воин союзник', initiative: '12', color: 'yellow' },
      { name: 'Слизь', initiative: '3', color: 'red' },
    ];
  }

  sort(): void {
    this.units.sort((a, b) => parseInt(b.initiative) - parseInt(a.initiative));
  }

  next(): void {
    let temp = this.units[0];
    this.units.shift();
    if (temp) this.units = [...this.units, temp];
  }
}

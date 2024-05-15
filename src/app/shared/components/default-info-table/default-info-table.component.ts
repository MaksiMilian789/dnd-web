import { Component, input } from '@angular/core';

import { Background, Class, Condition, Race } from '@core/models';

@Component({
  selector: 'app-default-info-table',
  templateUrl: './default-info-table.component.html',
  styleUrl: './default-info-table.component.scss',
})
export class DefaultInfoTableComponent {
  value = input.required<Class | Race | Background | Condition>();

  constructor() {}
}

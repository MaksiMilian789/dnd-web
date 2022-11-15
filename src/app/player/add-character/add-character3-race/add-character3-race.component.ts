import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-character3-race',
  templateUrl: './add-character3-race.component.html',
  styleUrls: ['./add-character3-race.component.scss'],
})
export class AddCharacter3RaceComponent {
  addForm: FormGroup;

  races = [
    'Дварф',
    'Драконорожденный',
    'Полуорк',
    'Полуэльф',
    'Эльф',
    'Человек',
  ];

  maxAge: number = -1;

  constructor() {
    this.addForm = new FormGroup({
      class: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
    //TODO: доделать распределение характеристик
  }

  save(): void {}

  changeMaxAge(maxAge: string): void {
    switch (maxAge) {
      case 'Дварф':
        this.maxAge = 250;
        break;
      case 'Драконорожденный':
        this.maxAge = 100;
        break;
      case 'Полуорк':
        this.maxAge = 100;
        break;
      case 'Полуэльф':
        this.maxAge = 220;
        break;
      case 'Эльф':
        this.maxAge = 500;
        break;
      case 'Человек':
        this.maxAge = 130;
        break;
    }
  }
}

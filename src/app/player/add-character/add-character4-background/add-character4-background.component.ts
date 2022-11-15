import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-character4-background',
  templateUrl: './add-character4-background.component.html',
  styleUrls: ['./add-character4-background.component.scss']
})
export class AddCharacter4BackgroundComponent {
  addForm: FormGroup;

  backgrounds = [
    'Артист',
    'Беспризорник',
    'Благородный',
    'Гильдейский ремесленник',
    'Моряк',
    'Мудрец',
    'Народный герой',
    'Отшельник',
    'Преступник',
    'Прислужник',
    'Солдат',
    'Чужеземец',
    'Шарлатан',
  ];

  ideologies = [
    'Законный',
    'Нейтральный',
    'Злой',
  ];

  maxAge: number = -1;

  constructor() {
    this.addForm = new FormGroup({
      background: new FormControl('', Validators.required),
      ideology: new FormControl('', Validators.required),
    });
    //TODO: доделать распределение навыков
  }

  save(): void {}
}

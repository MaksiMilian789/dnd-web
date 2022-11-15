import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-character1-name',
  templateUrl: './add-character1-name.component.html',
  styleUrls: ['./add-character1-name.component.scss'],
})
export class AddCharacter1NameComponent {
  addForm: FormGroup;

  sexes = ["Мужской", "Женский"];

  constructor() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
    });
  }

  save(): void{
    
  }
}

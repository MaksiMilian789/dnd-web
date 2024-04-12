import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Class } from 'src/app/core/models/class.model';
import { AddCharacterCacheService } from '../add-character-cache.service';

@Component({
  selector: 'app-add-character2-class',
  templateUrl: './add-character2-class.component.html',
  styleUrls: ['./add-character2-class.component.scss'],
})
export class AddCharacter2ClassComponent {
  addForm: FormGroup;

  classes$: Observable<Class[]>;

  description: string = 'Описание выбранного класса';

  constructor(
    private _cacheService: AddCharacterCacheService,
    private _http: HttpService,
    private _router: Router
  ) {
    this.addForm = new FormGroup({
      charClass: new FormControl('', Validators.required),
    });

    this.classes$ = this._http.getClasses();

    if (this._cacheService.character.name == '')
      this._router.navigate(['/player/createCharacterName']);

    if (this._cacheService.character.classId != 0) {
      this.classes$.subscribe((val) => {
        let char = val.find(
          (x) => x.id === this._cacheService.character.classId
        );
        this.addForm.setValue({
          charClass: char?.id,
        });
        this.description = char?.description as string;
      });
    }
  }

  save(): void {
    this._cacheService.secondStage(this.addForm.value.charClass);
  }

  changeDescription(description: string): void {
    this.description = description;
  }
}

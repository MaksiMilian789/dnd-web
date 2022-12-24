import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Gender } from 'src/app/shared/models/gender.model';
import { AddCharacterCacheService } from '../add-character-cache.service';

@Component({
  selector: 'app-add-character1-name',
  templateUrl: './add-character1-name.component.html',
  styleUrls: ['./add-character1-name.component.scss'],
})
export class AddCharacter1NameComponent {
  addForm: FormGroup;

  genders$: Observable<Gender[]>;

  constructor(
    private _cacheService: AddCharacterCacheService,
    private _http: HttpService
  ) {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });

    this.genders$ = this._http.getGenders();

    if (this._cacheService.character.charName != '') {
      this.genders$.subscribe((val) => {
        let gender = val.find(
          (x) => x.id === this._cacheService.character.genderId
        )?.id;
        this.addForm.patchValue({
          name: this._cacheService.character.charName,
          gender: gender,
        });
      });
    }
  }

  save(): void {
    this._cacheService.firstStage(
      this.addForm.value.name,
      this.addForm.value.gender
    );
  }
}

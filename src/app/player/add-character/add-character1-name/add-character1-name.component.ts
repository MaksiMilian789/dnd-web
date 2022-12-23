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

  constructor(private _cacheService: AddCharacterCacheService, private _http: HttpService) {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });

    this.genders$ = this._http.getGenders();
  }

  save(): void{
    this._cacheService.firstStage();
  }
}

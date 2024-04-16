import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Background } from '@core/models/character/background.model';
import { Ideology } from 'src/app/core/models/ideology.model';
import { AddCharacterCacheService } from '../add-character-cache.service';

@Component({
  selector: 'app-add-character4-background',
  templateUrl: './add-character4-background.component.html',
  styleUrls: ['./add-character4-background.component.scss'],
})
export class AddCharacter4BackgroundComponent {
  addForm: FormGroup;

  backgrounds$: Observable<Background[]>;

  ideologies$: Observable<Ideology[]>;

  descriptionBackground: string = 'Описание выбранной предыстории';
  descriptionIdeology: string = 'Описание выбранного мировозрения';

  constructor(
    private _cacheService: AddCharacterCacheService,
    private _http: HttpService,
    private _router: Router
  ) {
    this.addForm = new FormGroup({
      background: new FormControl('', Validators.required),
      ideology: new FormControl('', Validators.required),
    });

    this.backgrounds$ = this._http.getBackgrounds();
    this.ideologies$ = this._http.getIdeologies();

    if(this._cacheService.character.name == '') this._router.navigate(['/player/createCharacterName']);
  }

  save(): void {
    this._cacheService.fourthStage(
      this.addForm.value.background,
      this.addForm.value.ideology,
    );

    this._cacheService.save();
  }

  changeDescriptionBackground(description: string): void {
    this.descriptionBackground = "Предыстория: " + description;
  }

  changeDescriptionIdeology(description: string): void {
    this.descriptionIdeology = "Мировозрение: " + description;
  }
}

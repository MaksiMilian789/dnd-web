import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/shared';
import { ShortCharacter } from 'src/app/shared/models/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  shortCharacters$: Observable<ShortCharacter[]> =
    this._http.loadShortCharacters('maksim');

  constructor(private _http: HttpService) {}
}

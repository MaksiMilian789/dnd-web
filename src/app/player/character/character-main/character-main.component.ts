import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Character } from 'src/app/shared/models/character';

@Component({
  selector: 'app-character-main',
  templateUrl: './character-main.component.html',
  styleUrls: ['./character-main.component.scss']
})
export class CharacterMainComponent implements OnInit {
  character$: Observable<Character> = this._http.loadCharacter(1);

  constructor(private _http: HttpService) {
  }

  ngOnInit(): void {
  }

}

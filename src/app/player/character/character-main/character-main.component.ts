import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Character } from 'src/app/shared/models/character';

@Component({
  selector: 'app-character-main',
  templateUrl: './character-main.component.html',
  styleUrls: ['./character-main.component.scss'],
})
export class CharacterMainComponent implements OnInit {
  character$: Observable<Character> = this._http.loadCharacter(
    Number(this._route.snapshot.paramMap.get('characterId'))
  );

  constructor(private _http: HttpService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
  }
}

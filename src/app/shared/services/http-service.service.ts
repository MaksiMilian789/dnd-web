import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShortCharacter } from '../models/character';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  public loadShortCharacters(login: string): Observable<ShortCharacter[]> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: ShortCharacter[] = [
      {
        name: 'Максимилиан',
        class: 'Волшебник',
        level: 10,
      },
      {
        name: 'Элейна',
        class: 'Бард',
        level: 17,
      },
    ];
    return of(res);
  }
}

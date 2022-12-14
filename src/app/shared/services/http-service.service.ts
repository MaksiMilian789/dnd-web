import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShortCharacter } from '../models/character';
import { Observable, of } from 'rxjs';
import { ShortWorld } from '../models/world';

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

  public loadShortWorlds(login: string): Observable<ShortWorld[]> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: ShortWorld[] = [
      {
        id: 1,
        name: 'Sapience',
        description: 'Мир Тьмы – это полный аналог современного мира, в котором тайно обитают вампиры, оборотни, призраки, мумии, духи, зомби, колдуны, феи и прочая нечисть. Вампиры не умирают от старости, уязвимы по большей части только для огнестрельного оружия (особенно с разрывными пулями), мистических сил и огня. Солнечный свет убивает вампира почти мгновенно вне зависимости от его возраста и могущества.'
      },
      {
        id: 2,
        name: 'Новый Мир',
        description: 'Какой-то рандомный новый мир'
      },
    ];
    return of(res);
  }

  public loadWorld(id: number): Observable<ShortWorld> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: ShortWorld =
      {
        id: 1,
        name: 'Sapience',
        description: 'Мир Тьмы – это полный аналог современного мира, в котором тайно обитают вампиры, оборотни, призраки, мумии, духи, зомби, колдуны, феи и прочая нечисть. Вампиры не умирают от старости, уязвимы по большей части только для огнестрельного оружия (особенно с разрывными пулями), мистических сил и огня. Солнечный свет убивает вампира почти мгновенно вне зависимости от его возраста и могущества.'
      };
    return of(res);
  }
}

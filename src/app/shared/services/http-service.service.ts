import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Character, ShortCharacter } from '../models/character';
import { Observable, of } from 'rxjs';
import { ShortWorld } from '../models/world';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  _baseUrl: string = 'http://localhost:8081';

  constructor(private _http: HttpClient) {}

  public loadShortCharacters(login: string): Observable<ShortCharacter[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('login', login);
    return this._http.get<ShortCharacter[]>(
      `${this._baseUrl}/getListCharacters`,
      { params: params, headers: headers }
    );
  }

  public loadCharacter(id: number): Observable<Character> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<Character>(`${this._baseUrl}/characterInfo`, {
      params: params,
    });
  }

  public loadShortWorlds(login: string): Observable<ShortWorld[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('login', login);
    return this._http.get<ShortWorld[]>(`${this._baseUrl}/getListWorlds`, {
      params: params,
      headers: headers,
    });
  }

  public loadWorld(id: number): Observable<ShortWorld> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: ShortWorld = {
      id: 1,
      name: 'Sapience',
      description:
        'Мир Тьмы – это полный аналог современного мира, в котором тайно обитают вампиры, оборотни, призраки, мумии, духи, зомби, колдуны, феи и прочая нечисть. Вампиры не умирают от старости, уязвимы по большей части только для огнестрельного оружия (особенно с разрывными пулями), мистических сил и огня. Солнечный свет убивает вампира почти мгновенно вне зависимости от его возраста и могущества.',
    };
    return of(res);
  }
}

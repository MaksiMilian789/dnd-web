import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Character, ShortCharacter } from '../models/character.model';
import { Observable, of } from 'rxjs';
import { ShortWorld } from '../models/world.model';
import { TrackerUnit } from '../models/tracker-unit';
import { TrackerRequest } from '../models/tracker-request.model';

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

  public getTracker(id: number): Observable<TrackerUnit[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<TrackerUnit[]>(`${this._baseUrl}/getTracker`, {
      params: params,
      headers: headers,
    });
  }

  public setTracker(tracker: TrackerRequest): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.put<void>(
      `${this._baseUrl}/setTracker`,
      { tracker: tracker },
      {
        headers: headers,
      }
    );
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

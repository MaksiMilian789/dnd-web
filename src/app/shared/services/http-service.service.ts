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

  public loadWorld(id: number): Observable<ShortWorld> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<ShortWorld>(`${this._baseUrl}/getWorld`, {
      params: params,
      headers: headers,
    });
  }

  public createWorld(
    login: string,
    name: string,
    description: string
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/createWorld`,
      { login: login, name: name, description: description },
      {
        headers: headers,
      }
    );
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

  public setTracker(id: number, tracker: TrackerUnit[]): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.put<void>(
      `${this._baseUrl}/editTracker`,
      { id: id, tracker: tracker },
      {
        headers: headers,
      }
    );
  }
}

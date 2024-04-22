import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';
import { ShortWorld, TrackerUnit } from '@core/models';
import { Role } from '@core/enums';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this._baseUrl = `${config.api}/api/world`;
  }

  public loadShortWorlds(userId: number, role: Role): Observable<ShortWorld[]> {
    var params = new HttpParams().append('userId', userId);
    return this._http.get<ShortWorld[]>(`${this._baseUrl}/getListWorlds`, {
      params: params,
    });
  }

  public loadWorld(id: number): Observable<ShortWorld> {
    var params = new HttpParams().append('id', id);
    return this._http.get<ShortWorld>(`${this._baseUrl}/getWorld`, {
      params: params,
    });
  }

  public createWorld(
    userId: number,
    name: string,
    description: string
  ): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/createWorld`,
      { userId: userId, name: name, description: description },
      {}
    );
  }

  public getTracker(id: number): Observable<TrackerUnit[]> {
    var params = new HttpParams().append('id', id);
    return this._http.get<TrackerUnit[]>(`${this._baseUrl}/getTracker`, {
      params: params,
    });
  }

  public setTracker(id: number, tracker: TrackerUnit[]): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/editTracker`,
      { id: id, tracker: tracker },
      {}
    );
  }

  /*public editWorld(
    id: number,
    name: string,
    description: string
  ): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/editWorld`,
      { id: id, name: name, description: description },
      {}
    );
  }

  public deleteWorlds(ids: number[]): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteWorld`, {
      body: { id: ids },
    });
  }*/
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';
import { ShortWorld, TrackerUnit, World } from '@core/models';
import { Role } from '@core/enums';
import { Tracker } from '@core/models/tracker.model';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig,
  ) {
    this._baseUrl = `${config.api}/api/world`;
  }

  public loadShortWorlds(userId: number, role?: Role): Observable<ShortWorld[]> {
    var params = new HttpParams().append('userId', userId);
    if (!!role) {
      params = params.append('role', role);
    }
    return this._http.get<ShortWorld[]>(`${this._baseUrl}/getListWorlds`, {
      params: params,
    });
  }

  public loadWorld(id: number): Observable<World> {
    var params = new HttpParams().append('id', id);
    return this._http.get<World>(`${this._baseUrl}`, {
      params: params,
    });
  }

  public createWorld(userId: number, name: string, description: string): Observable<void> {
    var params = new HttpParams().append('userId', userId);
    return this._http.post<void>(
      `${this._baseUrl}`,
      { name: name, description: description },
      {
        params: params,
      },
    );
  }

  public editWorld(world: World): Observable<void> {
    return this._http.put<void>(`${this._baseUrl}`, world, {});
  }

  public getTracker(id: number): Observable<Tracker> {
    var params = new HttpParams().append('worldId', id);
    return this._http.get<Tracker>(`${this._baseUrl}/getTracker`, {
      params: params,
    });
  }

  public setTracker(id: number, tracker: TrackerUnit[]): Observable<void> {
    var params = new HttpParams().append('worldId', id);
    return this._http.put<void>(`${this._baseUrl}/setTracker`, tracker, {
      params: params,
    });
  }

  /*public deleteWorlds(ids: number[]): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteWorld`, {
      body: { id: ids },
    });
  }*/
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';
import { ShortWorld, TrackerUnit, World } from '@core/models';
import { Role } from '@core/enums';
import { Tracker } from '@core/models/tracker.model';
import { UserRole } from '@core/models/user-role.model';

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

  public createWorld(userId: number, name: string, description: string, imageId?: number): Observable<void> {
    var params = new HttpParams().append('userId', userId);
    return this._http.post<void>(
      `${this._baseUrl}`,
      { name: name, description: description, imageId: imageId },
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

  public addWikiPart(name: string, id: number): Observable<void> {
    var params = new HttpParams().append('worldId', id);
    params = params.append('name', name);
    return this._http.post<void>(
      `${this._baseUrl}/wikiPart`,
      {},
      {
        params: params,
      },
    );
  }

  public saveWikiPage(wikiId: number, header: string, text: string, imageId: number | null, pageId: number | null): Observable<void> {
    var params = new HttpParams().append('wikiId', wikiId);
    params = params.append('header', header);
    params = params.append('text', text);
    if(!!imageId){
      params = params.append('imageId', imageId);
    }
    if(!!pageId){
      params = params.append('pageId', pageId);
    }
    return this._http.put<void>(
      `${this._baseUrl}/wikiPage`,
      {},
      {
        params: params,
      },
    );
  }

  public getRolesForWorld(worldId: number): Observable<UserRole[]> {
    var params = new HttpParams().append('worldId', worldId);
    return this._http.get<UserRole[]>(`${this._baseUrl}/getUserRoles`, {
      params: params,
    });
  }

  public setRolesForWorld(worldId: number, roles: UserRole[]): Observable<void> {
    var params = new HttpParams().append('worldId', worldId);
    return this._http.put<void>(`${this._baseUrl}/setUserRoles`, roles, {
      params: params,
    });
  }

  /*public deleteWorlds(ids: number[]): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteWorld`, {
      body: { id: ids },
    });
  }*/
}

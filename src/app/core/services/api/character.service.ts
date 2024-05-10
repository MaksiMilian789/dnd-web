import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';
import {
  Background,
  BackgroundCreate,
  Character,
  CharacterWithId,
  Class,
  ClassCreate,
  Race,
  RaceCreate,
  ShortCharacter,
  Skill,
} from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig,
  ) {
    this._baseUrl = `${config.api}/api/character`;
  }

  public loadShortCharacters(id: number): Observable<ShortCharacter[]> {
    var params = new HttpParams().append('id', id);
    return this._http.get<ShortCharacter[]>(`${this._baseUrl}/getListCharacters`, {
      params: params,
    });
  }

  public loadCharacter(id: number): Observable<Character> {
    var params = new HttpParams().append('id', id);
    return this._http.get<Character>(`${this._baseUrl}`, {
      params: params,
    });
  }

  public createCharacter(character: CharacterWithId, id: number): Observable<void> {
    var params = new HttpParams().append('userId', id);
    return this._http.post<void>(`${this._baseUrl}`, character, {
      params: params,
    });
  }

  public editCharacterHp(charId: number, hp: number, addHp: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('hp', hp);
    params = params.append('addHp', addHp);
    return this._http.put<void>(
      `${this._baseUrl}/hp`,
      {},
      {
        params: params,
      },
    );
  }

  public editCharacterInfo(charId: number, name: string, level: number, age: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('level', level);
    params = params.append('age', age);
    params = params.append('name', name);
    return this._http.put<void>(
      `${this._baseUrl}/editInfo`,
      {},
      {
        params: params,
      },
    );
  }

  public addCharacterSkill(charId: number, skillId: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('skillId', skillId);
    return this._http.put<void>(
      `${this._baseUrl}/addSkill`,
      {},
      {
        params: params,
      },
    );
  }

  public addCharacterCondition(charId: number, conditionId: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('conditionId', conditionId);
    return this._http.put<void>(
      `${this._baseUrl}/addCondition`,
      {},
      {
        params: params,
      },
    );
  }

  public addCharacterInventoryObject(charId: number, objectId: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('objectId', objectId);
    return this._http.put<void>(
      `${this._baseUrl}/addObject`,
      {},
      {
        params: params,
      },
    );
  }

  public addCharacterSpell(charId: number, spellId: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('spellId', spellId);
    return this._http.put<void>(
      `${this._baseUrl}/addSpell`,
      {},
      {
        params: params,
      },
    );
  }

  public saveNote(
    charId: number,
    header: string,
    text: string,
    imageId: number | null,
    noteId: number | null,
  ): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('header', header);
    params = params.append('text', text);
    if (!!imageId) {
      params = params.append('imageId', imageId);
    }
    if (!!noteId) {
      params = params.append('noteId', noteId);
    }
    return this._http.put<void>(
      `${this._baseUrl}/note`,
      {},
      {
        params: params,
      },
    );
  }

  public toggleSkill(charId: number, skillId: number, active: boolean): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('skillId', skillId);
    params = params.append('active', active);
    return this._http.put<void>(
      `${this._baseUrl}/toggleSkill`,
      {},
      {
        params: params,
      },
    );
  }

  public resetSkillCharges(charId: number, skillId: number): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('skillId', skillId);
    return this._http.put<void>(
      `${this._baseUrl}/resetSkillCharges`,
      {},
      {
        params: params,
      },
    );
  }

  public equipInventoryObject(charId: number, objectId: number, equip: boolean): Observable<void> {
    var params = new HttpParams().append('id', charId);
    params = params.append('objectId', objectId);
    params = params.append('equip', equip);
    return this._http.put<void>(
      `${this._baseUrl}/equipObject`,
      {},
      {
        params: params,
      },
    );
  }

  /*public deleteCharacters(ids: number[]): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacter`, {
      body: { id: ids },
    });
  }

  public deleteCharacterItem(id: number): Observable<void> {
    var params = new HttpParams().append('id', id);
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterItem`, {
      params: params,
    });
  }

  public deleteCharacterSpell(charId: number, id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterSpell`, {
      body: { charId: charId, spellId: id },
    });
  }

  public deleteCharacterSkill(charId: number, id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterSkill`, {
      body: { charId: charId, skillId: id },
    });
  }

  public deleteCharacterCondition(
    charId: number,
    conditionId: number
  ): Observable<void> {
    return this._http.delete<void>(
      `${this._baseUrl}/deleteCharacterCondition`,
      {
        body: { charId: charId, conditionId: conditionId },
      }
    );
  }*/
}

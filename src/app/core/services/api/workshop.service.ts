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
  Condition,
  ConditionCreate,
  Race,
  RaceCreate,
  ShortCharacter,
  Skill,
  SkillCreate,
} from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig,
  ) {
    this._baseUrl = `${config.api}/api/workshop`;
  }
  
  public getConditions(): Observable<Condition[]> {
    return this._http.get<Condition[]>(`${this._baseUrl}/getConditions`, {});
  }

  public createCondition(req: ConditionCreate): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}/condition`, req);
  }

  public getClasses(): Observable<Class[]> {
    return this._http.get<Class[]>(`${this._baseUrl}/getClasses`, {});
  }

  public createClass(req: ClassCreate): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}/class`, req);
  }

  public getRaces(): Observable<Race[]> {
    return this._http.get<Race[]>(`${this._baseUrl}/getRaces`, {});
  }

  public createRace(req: RaceCreate): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}/race`, req);
  }

  public getBackgrounds(): Observable<Background[]> {
    return this._http.get<Background[]>(`${this._baseUrl}/getBackgrounds`, {});
  }

  public createBackground(req: BackgroundCreate): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}/background`, req);
  }

  public getSkills(): Observable<Skill[]> {
    return this._http.get<Skill[]>(`${this._baseUrl}/getSkills`, {});
  }

  public createSkill(req: SkillCreate): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}/skill`, req);
  }

  /*public deleteCharacters(ids: number[]): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacter`, {
      body: { id: ids },
    });
  }

  public getItems(): Observable<Item[]> {
    return this._http.get<Item[]>(`${this._baseUrl}/listItems`, {});
  }

  public addCharacterItem(charId: number, objectId: number): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterItem`,
      { charId: charId, objectId: objectId },
      {}
    );
  }

  public deleteCharacterItem(id: number): Observable<void> {
    var params = new HttpParams().append('id', id);
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterItem`, {
      params: params,
    });
  }

  public getSpells(): Observable<Spell[]> {
    return this._http.get<Spell[]>(`${this._baseUrl}/listSpells`, {});
  }

  public addCharacterSpell(charId: number, spellId: number): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterSpell`,
      { charId: charId, spellId: spellId },
      {}
    );
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

  public editCharacterInfo(
    id: number,
    name: string,
    age: number
  ): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterInfo`,
      {
        id: id,
        name: name,
        age: age,
      },
      {}
    );
  }

  public editCharacterLevel(
    id: number,
    level: number,
    maxHp: number,
    proficiencyBonus: number
  ): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterLevel`,
      {
        id: id,
        level: level,
        maxHp: maxHp,
        proficiencyBonus: proficiencyBonus,
      },
      {}
    );
  }

  public getConditions(): Observable<Condition[]> {
    return this._http.get<Condition[]>(`${this._baseUrl}/listConditions`, {});
  }

  public getCharacterConditions(id: number): Observable<Condition[]> {
    var params = new HttpParams().append('id', id);
    return this._http.get<Condition[]>(`${this._baseUrl}/characterConditions`, {
      params: params,
    });
  }

  public addCharacterCondition(
    charId: number,
    conditionId: number
  ): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterCondition`,
      { charId: charId, conditionId: conditionId },
      {}
    );
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

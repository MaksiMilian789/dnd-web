import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';
import {
  Background,
  Character,
  CharacterWithId,
  Class,
  Condition,
  Gender,
  Ideology,
  Inventory,
  Item,
  Race,
  ShortCharacter,
  ShortWorld,
  Skill,
  Spell,
  TrackerUnit,
} from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this._baseUrl = `${config.api}/api`;
  }

  public loadShortCharacters(login: string): Observable<ShortCharacter[]> {
    var params = new HttpParams().append('login', login);
    return this._http.get<ShortCharacter[]>(
      `${this._baseUrl}/getListCharacters`,
      { params: params }
    );
  }

  public loadCharacter(id: number): Observable<Character> {
    var params = new HttpParams().append('id', id);
    return this._http.get<Character>(`${this._baseUrl}/characterInfo`, {
      params: params,
    });
  }

  public loadShortWorlds(login: string): Observable<ShortWorld[]> {
    var params = new HttpParams().append('login', login);
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
    login: string,
    name: string,
    description: string
  ): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/createWorld`,
      { login: login, name: name, description: description },
      {}
    );
  }

  public editWorld(
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

  public deleteCharacters(ids: number[]): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacter`, {
      body: { id: ids },
    });
  }

  public getGenders(): Observable<Gender[]> {
    return this._http.get<Gender[]>(`${this._baseUrl}/listGenders`, {});
  }

  public getClasses(): Observable<Class[]> {
    return this._http.get<Class[]>(`${this._baseUrl}/listClasses`, {});
  }

  public getRaces(): Observable<Race[]> {
    return this._http.get<Race[]>(`${this._baseUrl}/listRaces`, {});
  }

  public getBackgrounds(): Observable<Background[]> {
    return this._http.get<Background[]>(`${this._baseUrl}/listBackgrounds`, {});
  }

  public getIdeologies(): Observable<Ideology[]> {
    return this._http.get<Ideology[]>(`${this._baseUrl}/listIdeologies`, {});
  }

  public createCharacter(
    req: CharacterWithId,
    login: string
  ): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/createCharacter`,
      { login: login, charStructure: req },
      {}
    );
  }

  public getInventory(id: number): Observable<Inventory[]> {
    var params = new HttpParams().append('id', id);
    return this._http.get<Inventory[]>(`${this._baseUrl}/characterInventory`, {
      params: params,
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

  public getCharacterSpells(id: number): Observable<Spell[]> {
    var params = new HttpParams().append('id', id);
    return this._http.get<Spell[]>(`${this._baseUrl}/characterSpells`, {
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

  public getCharacterSkills(id: number): Observable<Skill[]> {
    var params = new HttpParams().append('id', id);
    return this._http.get<Skill[]>(`${this._baseUrl}/characterSkills`, {
      params: params,
    });
  }

  public getSkills(): Observable<Skill[]> {
    return this._http.get<Skill[]>(`${this._baseUrl}/listSkills`, {});
  }

  public addCharacterSkill(charId: number, skillId: number): Observable<void> {
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterSkill`,
      { charId: charId, skillId: skillId },
      {}
    );
  }

  public deleteCharacterSkill(charId: number, id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterSkill`, {
      body: { charId: charId, skillId: id },
    });
  }

  public editCharacterStats(
    id: number,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  ): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterStats`,
      {
        id: id,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
      },
      {}
    );
  }

  public editCharacterHp(
    id: number,
    hp: number,
    addHp: number
  ): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterHp`,
      {
        id: id,
        hp: hp,
        addHp: addHp,
      },
      {}
    );
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
  }

  public editPriorityObject(id: number, type: number): Observable<void> {
    return this._http.put<void>(
      `${this._baseUrl}/priorityObject`,
      { id: id, type: type },
      {}
    );
  }
}

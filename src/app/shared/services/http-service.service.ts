import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  Character,
  CharacterWithId,
  ShortCharacter,
} from '../models/character.model';
import { Observable, of } from 'rxjs';
import { ShortWorld } from '../models/world.model';
import { TrackerUnit } from '../models/tracker-unit';
import { Gender } from '../models/gender.model';
import { Class } from '../models/class.model';
import { Race } from '../models/race.model';
import { Background } from '../models/background.model';
import { Ideology } from '../models/ideology.model';
import { Inventory } from '../models/inventory.model';
import { Item } from '../models/item.model';
import { Skill } from '../models/skill.model';
import { Spell } from '../models/spell.model';
import { Condition } from '../models/condition.model';

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

  public editWorld(
    id: number,
    name: string,
    description: string
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.put<void>(
      `${this._baseUrl}/editWorld`,
      { id: id, name: name, description: description },
      {
        headers: headers,
      }
    );
  }

  public deleteWorlds(ids: number[]): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.delete<void>(`${this._baseUrl}/deleteWorld`, {
      headers: headers,
      body: { id: ids },
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

  public deleteCharacters(ids: number[]): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacter`, {
      headers: headers,
      body: { id: ids },
    });
  }

  public getGenders(): Observable<Gender[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Gender[]>(`${this._baseUrl}/listGenders`, {
      headers: headers,
    });
  }

  public getClasses(): Observable<Class[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Class[]>(`${this._baseUrl}/listClasses`, {
      headers: headers,
    });
  }

  public getRaces(): Observable<Race[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Race[]>(`${this._baseUrl}/listRaces`, {
      headers: headers,
    });
  }

  public getBackgrounds(): Observable<Background[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Background[]>(`${this._baseUrl}/listBackgrounds`, {
      headers: headers,
    });
  }

  public getIdeologies(): Observable<Ideology[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Ideology[]>(`${this._baseUrl}/listIdeologies`, {
      headers: headers,
    });
  }

  public createCharacter(
    req: CharacterWithId,
    login: string
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/createCharacter`,
      { login: login, charStructure: req },
      {
        headers: headers,
      }
    );
  }

  public getInventory(id: number): Observable<Inventory[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<Inventory[]>(`${this._baseUrl}/characterInventory`, {
      params: params,
      headers: headers,
    });
  }

  public getItems(): Observable<Item[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Item[]>(`${this._baseUrl}/listItems`, {
      headers: headers,
    });
  }

  public addCharacterItem(charId: number, objectId: number): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterItem`,
      { charId: charId, objectId: objectId },
      {
        headers: headers,
      }
    );
  }

  public deleteCharacterItem(id: number): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterItem`, {
      params: params,
      headers: headers,
    });
  }

  public getCharacterSpells(id: number): Observable<Spell[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<Spell[]>(`${this._baseUrl}/characterSpells`, {
      params: params,
      headers: headers,
    });
  }

  public getSpells(): Observable<Spell[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Spell[]>(`${this._baseUrl}/listSpells`, {
      headers: headers,
    });
  }

  public addCharacterSpell(charId: number, spellId: number): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterSpell`,
      { charId: charId, spellId: spellId },
      {
        headers: headers,
      }
    );
  }

  public deleteCharacterSpell(charId: number, id: number): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterSpell`, {
      headers: headers,
      body: { charId: charId, spellId: id },
    });
  }

  public getCharacterSkills(id: number): Observable<Skill[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<Skill[]>(`${this._baseUrl}/characterSkills`, {
      params: params,
      headers: headers,
    });
  }

  public getSkills(): Observable<Skill[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Skill[]>(`${this._baseUrl}/listSkills`, {
      headers: headers,
    });
  }

  public addCharacterSkill(charId: number, skillId: number): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterSkill`,
      { charId: charId, skillId: skillId },
      {
        headers: headers,
      }
    );
  }

  public deleteCharacterSkill(charId: number, id: number): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.delete<void>(`${this._baseUrl}/deleteCharacterSkill`, {
      headers: headers,
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
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
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
      {
        headers: headers,
      }
    );
  }

  public editCharacterHp(
    id: number,
    hp: number,
    addHp: number
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterHp`,
      {
        id: id,
        hp: hp,
        addHp: addHp,
      },
      {
        headers: headers,
      }
    );
  }

  public editCharacterInfo(
    id: number,
    name: string,
    age: number
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterInfo`,
      {
        id: id,
        name: name,
        age: age,
      },
      {
        headers: headers,
      }
    );
  }

  public editCharacterLevel(
    id: number,
    level: number,
    maxHp: number,
    proficiencyBonus: number
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.put<void>(
      `${this._baseUrl}/editCharacterLevel`,
      {
        id: id,
        level: level,
        maxHp: maxHp,
        proficiencyBonus: proficiencyBonus,
      },
      {
        headers: headers,
      }
    );
  }

  public getConditions(): Observable<Condition[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.get<Condition[]>(`${this._baseUrl}/listConditions`, {
      headers: headers,
    });
  }

  public getCharacterConditions(id: number): Observable<Condition[]> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    var params = new HttpParams().append('id', id);
    return this._http.get<Condition[]>(`${this._baseUrl}/characterConditions`, {
      params: params,
      headers: headers,
    });
  }

  public addCharacterCondition(
    charId: number,
    conditionId: number
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.post<void>(
      `${this._baseUrl}/addCharacterCondition`,
      { charId: charId, conditionId: conditionId },
      {
        headers: headers,
      }
    );
  }

  public deleteCharacterCondition(
    charId: number,
    conditionId: number
  ): Observable<void> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: sessionStorage.getItem('jwt') as string,
    });
    return this._http.delete<void>(
      `${this._baseUrl}/deleteCharacterCondition`,
      {
        headers: headers,
        body: { charId: charId, conditionId: conditionId },
      }
    );
  }
}

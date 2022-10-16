import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResults } from '../models/results';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  /**
   * Отправление результатов теста в БД
   */
  public sendResut(result: httpResults): Observable<void> {
    /*return this._http.post(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    return of();
  }

  /**
   * Получение результатов теста в БД
   */
  public getResut(result: httpResults): Observable<httpResults[]> {
    /*return this._http.get(
      `${this._baseUrl}/Users/${idUser}/group/${idGroup}`,
      {}
    );*/
    let res: httpResults[] = [
      {
        login: 'maksim',
        time: 50,
        mistakes: 1,
        date: new Date(),
        efficiency: 5,
        workability: 1,
        sustainability: 1,
      },
      {
        login: 'elya',
        time: 30,
        mistakes: 0,
        date: new Date(),
        efficiency: 7,
        workability: 1.2,
        sustainability: 0.5,
      },
    ];
    return of(res);
  }
}

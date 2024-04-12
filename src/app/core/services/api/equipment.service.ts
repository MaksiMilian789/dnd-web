import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';
import { Equipment, EquipmentRequest, HistoryRequest, Status, StatusInfo, StatusRequest } from '@core/models';
import { toHttpParams } from '@shared/utils/params';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig,
  ) {
    this._baseUrl = `${config.api.equipment}/api/equipment`;
  }

  getEquipments(): Observable<Equipment[]> {
    return this._http.get<Equipment[]>(`${this._baseUrl}`, {});
  }

  getEquipment(id: number): Observable<Equipment> {
    return this._http.get<Equipment>(`${this._baseUrl}/${id}`, {});
  }

  addEquipment(equipment: EquipmentRequest): Observable<void> {
    return this._http.post<void>(`${this._baseUrl}`, equipment);
  }

  deleteEquipment(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseUrl}/${id}`);
  }

  editEquipment(equipment: EquipmentRequest): Observable<void> {
    return this._http.put<void>(`${this._baseUrl}/${equipment.id}`, equipment);
  }

  getStatuses(): Observable<StatusInfo[]> {
    return this._http.get<StatusInfo[]>(`${this._baseUrl}/statuses`, {});
  }

  changeStatus(req: StatusRequest): Observable<void> {
    return this._http.put<void>(`${this._baseUrl}/statuses`, req);
  }

  changeBlock(block: boolean, id: number): Observable<void> {
    return this._http.put<void>(`${this._baseUrl}/${id}/block`, block);
  }

  getHistory(req: HistoryRequest): Observable<Status[]> {
    const params = toHttpParams(req);
    return this._http.get<Status[]>(`${this._baseUrl}/statusHistory`, {
      params,
    });
  }
}

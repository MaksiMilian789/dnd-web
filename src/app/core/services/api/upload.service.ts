import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UploadedFile } from '@core/models/uploaded-file.model';
import { APP_CONFIG, AppConfig } from '@core/config';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private _baseUrl: string;

  constructor(
    private _http: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this._baseUrl = `${config.api}/api/upload`;
  }

  /**
   * Returns url to uploaded file
   * @param fileId Id of uploaded file
   */
  url(fileId: number): string {
    return this._baseUrl + '/' + fileId;
  }

  /**
   * Uploads file to server with progress notifying.
   * @param file File to upload
   */
  upload(file: File): Observable<HttpEvent<UploadedFile>> {
    const formData = new FormData();
    formData.append('upload', file);
    const uploadReq = new HttpRequest('POST', this._baseUrl, formData, {
      reportProgress: true,
    });
    return this._http.request(uploadReq);
  }

  /**
   * Gets info of uploaded file
   * @param fileId Id of uploaded file
   */
  getInfo(fileId: string): Observable<UploadedFile> {
    return this._http.get<UploadedFile>(this._baseUrl + `/${fileId}/info`);
  }
}
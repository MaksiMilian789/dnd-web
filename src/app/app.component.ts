import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { Observable, delay } from 'rxjs';

import { APP_CONFIG, AppConfig } from '@core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaderValue$: Observable<number>;

  constructor(
    public loader: LoadingBarService,
    private _updates: SwUpdate,
    private _snackbar: MatSnackBar,
    @Inject(APP_CONFIG) config: AppConfig,
    @Inject(LOCAL_STORAGE) private readonly _localStorage: Storage,
  ) {
    this.loaderValue$ = loader.value$.pipe(delay(0));

    _updates.versionUpdates.subscribe(() => {
      let version = _localStorage.getItem('version');
      if (!version) {
        _localStorage.setItem('version', config.version);
      }
      if (version != config.version) {
        _snackbar.open('Вышла новая версия приложения. Страница обновится через 3 секунды!');
        _localStorage.setItem('version', config.version);
        setTimeout(() => {
          document.location.reload();
        }, 3000);
      }
    });
  }
}

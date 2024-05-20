import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, delay } from 'rxjs';

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
  ) {
    this.loaderValue$ = loader.value$.pipe(delay(0));

    _updates.versionUpdates.subscribe(() => {
      _snackbar.open('Вышла новая версия приложения. Обновление произойдёт через 5 секунд!');
      _updates.activateUpdate().then(() => {
        document.location.reload();
      });
    });
  }
}

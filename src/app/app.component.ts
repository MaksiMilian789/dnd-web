import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, delay, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaderValue$: Observable<number>;

  constructor(public loader: LoadingBarService) {
    this.loaderValue$ = loader.value$.pipe(delay(0)).pipe(tap((val) => console.log(val)));
    loader.useRef().start;
    console.log(123)
  }
}

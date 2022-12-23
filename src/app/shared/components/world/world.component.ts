import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShortWorld } from '../../models/world.model';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
})
export class WorldComponent implements OnInit {
  world$: Observable<ShortWorld> = this._http.loadWorld(1);

  public role: string = '';

  constructor(private _http: HttpService, private _router: Router) {
    this.role = this._router.url.split('/')[1];
  }

  ngOnInit(): void {}
}

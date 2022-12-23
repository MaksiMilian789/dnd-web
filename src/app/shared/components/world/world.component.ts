import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShortWorld } from '../../models/world.model';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss'],
})
export class WorldComponent implements OnInit {
  public role: string = '';
  worldId: number = Number(this._route.snapshot.paramMap.get('worldId'));
  world$: Observable<ShortWorld>;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.role = this._router.url.split('/')[1];
    this.world$ = this._http.loadWorld(this.worldId);
  }

  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wiki-home',
  templateUrl: './wiki-home.component.html',
  styleUrl: './wiki-home.component.scss',
})
export class WikiHomeComponent {
  public role: string = '';

  constructor(private _router: Router) {
    this.role = this._router.url.split('/')[1];
  }
}

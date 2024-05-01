import { Component, OnDestroy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

import { Observable, Subscription } from 'rxjs';
import { PwaService } from 'src/app/shared/services/pwa-service.service';

@Component({
  templateUrl: './workshop-shell.component.html',
  styleUrls: ['./workshop-shell.component.scss'],
})
export class WorkshopShellComponent implements OnDestroy {
  showShadow: boolean = false;
  shadowCheck: Subscription;
  drawlerMode: MatDrawerMode = 'side';
  openDrawer: boolean = false;
  
  userLogin: string = "";

  constructor(
    public pwa: PwaService,
    private _auth: AuthService,
    private _router: Router
  ) {
      // Получение информации о пользователе
      this.userLogin = _auth.currentUser?.login ?? '';

    this.shadowCheck = this._router.events.subscribe(() => {
      if (this._router.url == '/workshop') {
        this.showShadow = true;
      } else {
        this.showShadow = false;
      }
    });

    if(pwa.modalPwaPlatform == 'ANDROID') this.drawlerMode = 'over';
  }

  ngOnDestroy(): void {
    this.shadowCheck.unsubscribe();
  }

  logout(): void {
    this._auth.logout();
  }

  private _formatFio(fio: string): string {
    let result = '';
    const parts = fio.split(' ');
    result += parts[0];
    if (parts.length > 1) {
      result += ' ' + parts[1][0] + '.';
    }
    if (parts.length > 2) {
      result += ' ' + parts[2][0] + '.';
    }
    return result;
  }
}

import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  public modalPwaPlatform: string | undefined = 'ANDROID'; // убрать значение
  modalPwaEvent: any;
  showInstallPromotion: boolean = false;

  constructor(private platform: Platform) {
    console.log('constructor pwa');
    this._loadModalPwa();
  }

  addToHomeScreen() {
    this.showInstallPromotion = false;
    this.modalPwaEvent.prompt();
    this.modalPwaEvent.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.modalPwaEvent = null;
    });
  }

  private _loadModalPwa(): void {
    if (this.platform.ANDROID) {
      console.log('ANDROID');
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.modalPwaEvent = e;
        this.showInstallPromotion = true;
        this.modalPwaPlatform = 'ANDROID';
        console.log(this.modalPwaPlatform);
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode =
        'standalone' in window.navigator &&
        (<any>window.navigator)['standalone'];
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }
}

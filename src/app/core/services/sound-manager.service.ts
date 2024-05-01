import { Injectable } from '@angular/core';

const SOUND_PATH = '/assets/sound';

@Injectable({
  providedIn: 'root',
})
export class SoundManagerService {
  private readonly _alertAudio = new Audio(`${SOUND_PATH}/alert.ogg`);
  private readonly _notificationAudio = new Audio(`${SOUND_PATH}/notification.ogg`);

  playAlert(): void {
    this._playSound(this._alertAudio);
  }

  playNotification(): void {
    this._playSound(this._notificationAudio);
  }

  private _playSound(audio: HTMLAudioElement): void {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
}

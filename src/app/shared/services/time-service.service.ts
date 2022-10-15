import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class timeService {
  time: number = 0;
  isRunning: boolean = false;
  timerDisplay!: string;
  timeStage: number[] = [];

  constructor() {
    timer(0, 1000).subscribe((ellapsedCycles) => {
      if (this.isRunning) {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
      }
    });
  }

  startTimer(): void {
    this.time = 0;
    this.timerDisplay = '00:00';
    this.isRunning = true;
    this.timeStage = [];
  }

  stopTimer(): void {
    this.time = 0;
    this.timerDisplay = '';
    this.timeStage = [];
  }

  saveTimeStage(): void {
    this.timeStage.push(this.time);
  }

  getDisplayTimer(time: number): string {
    const minutes = '0' + Math.floor((time % 3600) / 60);
    const seconds = '0' + Math.floor((time % 3600) % 60);

    return (
      minutes.slice(-2, -1) +
      minutes.slice(-1) +
      ':' +
      seconds.slice(-2, -1) +
      seconds.slice(-1)
    );
  }
}

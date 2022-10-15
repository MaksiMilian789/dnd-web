import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog';
import { ResultDialogComponent } from '../shared/components/result-dialog';
import { SimpleDialogComponent } from '../shared/components/simple-dialog';
import { timeService } from '../shared/services/time-service.service';
import { resultService } from './result-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent{
  //перемешанная матрица кнопок
  matrix: number[][] = [];

  //шаблон верной последовательности
  sequence: number[] = [];

  //индекс в шаблоне
  k: number = 0;

  //цветовая индикация
  color: string = '';

  //размерность таблицы теста
  N: number = 5;

  disabled: boolean = true;

  stage!: number;

  mistakes!: number;

  constructor(
    private _dialog: MatDialog,
    private _result: resultService,
    public timer: timeService
  ) {
    this.buildSequence();
    this.buildMatrix();
  }

  buildSequence(): void {
    this.sequence = [];
    for (let i = 0; i < this.N * this.N; i++) {
      this.sequence.push(i + 1);
    }
  }

  buildMatrix(): void {
    this.matrix = [];
    let random = Array.from(this.sequence);
    random.sort(() => Math.random() - 0.5);

    let k = 0;
    for (let i = 0; i < this.N; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.N; j++) {
        this.matrix[i][j] = random[k];
        k++;
      }
    }
  }

  start(): void {
    this.buildSequence();
    this.buildMatrix();
    this.disabled = false;
    this.stage = 1;
    this.mistakes = 0;
    this.timer.startTimer();
  }

  stop(): void {
    this.timer.isRunning = false;
    this.disabled = true;
    this.stage = 0;
    this.mistakes = -1;
    this.timer.stopTimer();
  }

  rebuild(): void {
    this.buildSequence();
    this.buildMatrix();
  }

  checkButton(number: any): void {
    if (this.sequence[this.k] == number) {
      this.sequence = this.sequence.slice(1);
      if (number == 3) {
        //number == this.N*this.N
        this.color = 'primary';
        setTimeout(() => {
          this.color = '';
        }, 250);
        this.timer.saveTimeStage();

        if (this.stage == 5) {
          this.timer.isRunning = false;
          this.disabled = true;
          this.openResults();
          return;
        }

        this.stage++;
        this.rebuild();
      }
    } else {
      this.mistakes++;
      this.color = 'warn';
      setTimeout(() => {
        this.color = '';
      }, 250);
    }
  }

  startWithGuide(): void {
    //TODO: получение инструкции по http
    let guide =
      'Вам будут поочередно предложены 5 таблиц с числами от 1 до 25, расположенными в произвольном порядк. Ваша задача - выбирать в каждой таблице числа по возрастанию (от 1 до 25). Выбор осуществляется при помощи клика по ячейке с числом. По окончании прохождения теста вам будут предложены результаты тестирования. После нажатия кнопки "Начать тестирование" тестирование начнётся с новой таблицей.';

    this._dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'Инструкция',
          text: guide,
          actionText: 'Начать тест',
          actionColor: 'primary',
        },
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.start();
        }
      });
  }

  openGuide(): void {
    //TODO: получение инструкции по http
    let guide =
      'Вам будут поочередно предложены 5 таблиц с числами от 1 до 25, расположенными в произвольном порядк. Ваша задача - выбирать в каждой таблице числа по возрастанию (от 1 до 25). Выбор осуществляется при помощи клика по ячейке с числом. По окончании прохождения теста вам будут предложены результаты тестирования. После нажатия кнопки "Начать тестирование" тестирование начнётся с новой таблицей.';

    this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Инструкция',
        text: guide,
      },
      width: '50%',
    });
  }

  openResults(): void {
    let result = this._result.calcResult(
      this.timer.timeStage,
      this.mistakes,
      this.timer.time
    );

    this._dialog.open(ResultDialogComponent, {
      data: {
        title: 'Результаты',
        time: this.timer.time,
        mistakes: this.mistakes,
        result: result,
      },
      width: '50%',
    });
  }
}

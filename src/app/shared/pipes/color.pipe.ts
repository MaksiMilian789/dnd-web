import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color',
})
export class ColorPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'red':
        return 'Красный';
      case 'green':
        return 'Зелёный';
      case 'yellow':
        return 'Жёлтый';
      default:
        return 'Цвет';
    }
  }
}

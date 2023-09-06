import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comaFilter',
})
export class ComaFilterPipe implements PipeTransform {
  transform(item: string): string {
    if (item.toString().indexOf(',') > -1) {
      const hasComa = item.replace(',', '.');
      return hasComa;
    } else {
      return item;
    }
  }
}

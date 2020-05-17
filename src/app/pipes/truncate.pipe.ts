import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length?: number): string {
    if (value === null) {
      return ;
    }
    if (length === null) {
      return value.substring(0, value.length - 1);
    }
    return value.substring(0, length);
  }

}

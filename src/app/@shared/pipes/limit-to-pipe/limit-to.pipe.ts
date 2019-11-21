import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: string | undefined, limit: number): string {
    if (value && value.length > limit) {
      return `${value.substr(0, limit - 1)}...`;
    }
    return value;
  }

}

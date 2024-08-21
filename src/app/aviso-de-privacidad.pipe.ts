import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avisoDePrivacidad'
})
export class AvisoDePrivacidadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

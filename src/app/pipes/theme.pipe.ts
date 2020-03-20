import { Pipe, PipeTransform } from '@angular/core';
import { THEME_SIMPOSIO } from '../declarations';

@Pipe({
  name: 'theme'
})
export class ThemePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return THEME_SIMPOSIO.filter(el => el.id == value)[0].name;

  }

} 

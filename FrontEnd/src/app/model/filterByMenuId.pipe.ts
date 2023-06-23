import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByMenuId'
})
export class FilterByMenuIdPipe implements PipeTransform {
  transform(menu2: any[], menu: string): any[] {
    if (!menu2 || !menu) {
      return [];
    }
    
    return menu2.filter(item => item.id_menu === menu);
  }
}

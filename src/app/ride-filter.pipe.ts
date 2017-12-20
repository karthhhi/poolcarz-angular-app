import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilter'
})
export class RideFilterPipe implements PipeTransform {

  filteredArray: any[];
  transform(value: any[], args?: string): any[] {
    const place = 'Infosys';
    switch (args) {
        case 'to_infosys':
            this.filteredArray = value.filter(item => item.destination === place);
            break;
        case 'from_infosys':
            this.filteredArray = value.filter(item => item.pickUp === place);
            break;
        case 'others':
            this.filteredArray = value;
            break;
        default:
            this.filteredArray = value;
    }
    return this.filteredArray;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'itemsCount'
})

export class ItemsCountPipe implements PipeTransform {
	transform(value: number): string {
		if (value > 100 && value < 200) {
			return '100+';
		} else if (value > 200 && value <= 500) {
			return '200+';
		} else if (value > 500 && value < 1000) {
			return '500+';
		} else if (value > 1000 && value < 5000) {
			return '1000+';
		} else {
			return value + '';
		}
	}
}

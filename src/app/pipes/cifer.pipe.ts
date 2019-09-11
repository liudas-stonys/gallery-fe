import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'cifer'
})
export class CiferPipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		return null;
	}
}

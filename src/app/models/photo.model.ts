import { ITag } from 'src/app/models/tag.model';
import { ICategory } from './category.model';

export interface IPhoto {
	id: number;
	idImageFullSize: number;
	title: string;
	mime: string;
	data: string;
	size: number;
	description: string;
	createdAt: string;
	updatedAt: string;
	categories: ICategory[];
	tags: ITag[];
}

export enum ToplevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export interface TopPageAdvantage {
	title: string;
	description: string;
	_id: string;
}

export interface HhData {
	_id: string;
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: Date;
}

export interface Blog {
	h1: string;
	metaTitle: string;
	metaDescription: string;
	views: number;
	_id: string;
}

export interface TopPageModel {
	_id: string;
	tags: string[];
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	seoText: string;
	tagsTitle: string;
	metaTitle: string;
	metaDescription: string;
	firstCategory: ToplevelCategory;
	advantages: TopPageAdvantage[];
	createdAt: Date;
	updatedAt: Date;
	hh: HhData;
}


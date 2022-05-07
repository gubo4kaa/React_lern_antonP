export interface ProductCharacteristic {
	name: string;
	value: string;
}

export interface ReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	createdAt: Date;
}

export interface ProductModel {
	length: any;
	_id: string;
	categories: string[];
	tags: string[];
	title: string;
	image: ImageData;
	description: string;
	link: string;
	price: number;
	credit: number;
	oldPrice: number;
	characteristics: ProductCharacteristic[];
	advantages: string;
	disadvantages: string;
	initialRating: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	html: string;
	blog: any;
	reviews: ReviewModel[];
	reviewCount: number;
	reviewAvg?: any;
}


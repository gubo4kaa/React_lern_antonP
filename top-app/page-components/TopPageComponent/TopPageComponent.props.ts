import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";


export interface TopPageComponentProps{ // екстендим что бы ушла ошибка о том, что Home не ожидает таких пропсов
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
  }
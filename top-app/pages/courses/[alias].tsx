import React, {  } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";

const firstCategory = 0;

function Course({menu, page, products}: CourseProps): JSX.Element {
  return (
    <>
		{products && products.length}
    </>
  );
}


export default withLayout(Course); // експортируем дефолтный не самс компонент, а этот компонент в обёртке

export const getStaticPaths: GetStaticPaths = async () => {
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	
	return {
		paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
		fallback: true
	};
};// Получаем пути, для того, что бы некст знал как резолвить эту страницу, для этого приходит на помощь getStaticPach

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {// в результате мы видим что данные отображаются в исходном коде страницы, и мы можем отлично настроить СЕО
	if(!params) {
		return {
			notFound: true
		};
	}
	
	const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});// получаем меню

	const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);//Получаем страницу по алиасу

	const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
		category: page.category,
		limit: 10
	});//Получаем продукты
	
	return {
		props: {
			menu,
			firstCategory,
			page,
			products// отдаём продукты которые мы получили
		} // возвращает пропсы, и дальше передаёт их в компонент
	};
};

interface CourseProps extends Record<string, unknown> { // екстендим что бы ушла ошибка о том, что Home не ожидает таких пропсов
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
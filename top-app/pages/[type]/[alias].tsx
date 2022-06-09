import React, {  } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { TopPageComponent } from "../../page-components";
import { API } from "../../helpers/api";
import Head from 'next/head';

function TopPage({firstCategory, page, products}: TopPageProps): JSX.Element {
  return<>
		{page && products && <>
		<Head>
			<title>{page.metaTitle}</title>
			<meta name="description" content={page.metaDescription} />
			<meta property="og:title" content={page.metaTitle} />
			<meta property="og:description" content={page.metaTitle} />
			<meta property="og:type" content="article" />

		</Head>
		<TopPageComponent 
  		firstCategory={firstCategory} 
  		page={page} 
  		products={products} 
		/></>}
	</>  ;
}


export default withLayout(TopPage); // експортируем дефолтный не самс компонент, а этот компонент в обёртке

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
			firstCategory: m.id
		});
		paths = paths.concat(menu.flatMap(s => s.pages.map(p =>`/${m.route}/`  + p.alias)));
	}

	return {
		paths,
		fallback: true
	};
};// Получаем пути, для того, что бы некст знал как резолвить эту страницу, для этого приходит на помощь getStaticPach

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {// в результате мы видим что данные отображаются в исходном коде страницы, и мы можем отлично настроить СЕО
	if(!params) {
		return {
			notFound: true
		};
	}
	
	const firstCategoryItem = firstLevelMenu.find(m=>m.route == params.type);
	if(!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	try{//пытаемся сделать запросы, если не поолучается то еделаем catch
		const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id
		});// получаем меню
		if( menu.length == 0) {
			return {
				notFound: true
			};
		}
		const {data: page} = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);//Получаем страницу по алиасу
	
		const {data: products} = await axios.post<ProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10
		});//Получаем продукты
		
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products// отдаём продукты которые мы получили
			} // возвращает пропсы, и дальше передаёт их в компонент
		};
	} catch {
		return {
			notFound: true
		};
	}
	
};

interface TopPageProps extends Record<string, unknown> { // екстендим что бы ушла ошибка о том, что Home не ожидает таких пропсов
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
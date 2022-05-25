import React from "react";

import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

import { withLayout } from "../../layout/Layout";
import { MenuItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../helpers/api";
function Type({firstCategory}: TypeProps): JSX.Element {
  return (
    <> 
		
    </>
  );
}


export default withLayout(Type); // експортируем дефолтный не самс компонент, а этот компонент в обёртке

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true
	};
};// Получаем пути, для того, что бы некст знал как резолвить эту страницу, для этого приходит на помощь getStaticPach

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {// в результате мы видим что данные отображаются в исходном коде страницы, и мы можем отлично настроить СЕО
	if(!params) {
		return{
			notFound: true
		};
	}
	const firstCategoryItem = firstLevelMenu.find(m=>m.route == params.type);
	if(!firstCategoryItem) {
		return {
			notFound: true
		};
	}
	const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });//Запрос на бэк для получения данных о сайд меню слева
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    } // возвращает пропсы, и пробрасывает их на и дальше передаёт их в компонент
  };
};

interface TypeProps extends Record<string, unknown> { // екстендим что бы ушла ошибка о том, что Home не ожидает таких пропсов
  menu: MenuItem[];
  firstCategory: number;
}
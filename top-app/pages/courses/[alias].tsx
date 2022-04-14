import React, { useState } from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";

function Course({menu}: CourseProps): JSX.Element {
  return (
    <>
      
    </>
  );
}


export default withLayout(Course); // експортируем дефолтный не самс компонент, а этот компонент в обёртке

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {// в результате мы видим что данные отображаются в исходном коде страницы, и мы можем отлично настроить СЕО
	if(!params) {
		return {
			notFound: true
		};
	}
	const firstCategory = 0;

  const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });//

  const {data: page} = await axios.post<TopPageModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias, {
    firstCategory
  });//Получаем страницу по алиасу
  
  return {
    props: {
      menu,
      firstCategory,
	  page
    } // возвращает пропсы, и пробрасывает их на и дальше передаёт их в компонент
  };
};

interface CourseProps extends Record<string, unknown> { // екстендим что бы ушла ошибка о том, что Home не ожидает таких пропсов
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel[];
}
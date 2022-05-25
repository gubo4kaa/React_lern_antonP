import React, { useEffect, useState } from "react";
import { Button, Htag, Input, P, Rating } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { GetStaticProps } from "next";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";
function Home({menu, firstCategory}: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(1); // так как мы передаём в setReiting начальное число, он и является функцией изменения рейтинга

  return (
    <>
      <Htag tag='h1'>Тестовая</Htag>
      <Button appearance='primary' arrow="right">Кнопка</Button>
      <Button appearance='ghost' arrow="down">Кнопка</Button>
      <P size='s'>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <P>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <P size='l'>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <Input/>
    </>
  );
}


export default withLayout(Home); // експортируем дефолтный не самс компонент, а этот компонент в обёртке

export const getStaticProps: GetStaticProps<HomeProps> = async () => {// в результате мы видим что данные отображаются в исходном коде страницы, и мы можем отлично настроить СЕО
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });//Запрос на бэк для получения данных о сайд меню слева
  return {
    props: {
      menu,
      firstCategory
    } // возвращает пропсы, и пробрасывает их на и дальше передаёт их в компонент
  };
};

interface HomeProps extends Record<string, unknown> { // екстендим что бы ушла ошибка о том, что Home не ожидает таких пропсов
  menu: MenuItem[];
  firstCategory: number;
}
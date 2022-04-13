import React, { useEffect, useState } from "react";
import { Button, Htag, P, Rating } from "../components";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
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
    </>
  );
}


export default withLayout(Home); // експортируем дефолтный не самс компонент, а этот компонент в обёртке
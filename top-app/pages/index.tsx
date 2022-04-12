import React, { useEffect, useState } from "react";
import { Button, Htag, P, Rating } from "../components";

export default function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);// хук useState, превым параметром передаём то что нужно изменять, вторым функцию изменения

  useEffect(() => {// первым параметром передаётся стрелочная функция, вторым параметром передаются зависимости, после изменеия которых должен происходить триггер хука
    console.log('Counter'+ counter);
    return function cleanup() {// дёргается до начала перерендера и чтстит предыдущее состояние
      console.log('Unmount');
    };
  });

  useEffect(() => {
    console.log('Mounted');
  }, []);

  const [rating, setRating] = useState<number>(1);
  

  return (
    <>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearance='primary' arrow="right" onClick={() => setCounter(x => x+1)}>Кнопка</Button>
      <Button appearance='ghost' arrow="down">Кнопка</Button>
      <P size='s'>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <P>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <P size='l'>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <Rating rating={rating} isEditable setRating={setRating}/>
    </>
  );
}

import React from "react";
import { Button, Htag, P } from "../components";

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance='primary' arrow="right">Кнопка</Button>
      <Button appearance='ghost' arrow="down">Кнопка</Button>
      <P size='s'>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <P>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
      <P size='l'>slkdflksnfnewiojiojsoijcoisdnsklfdlkcsoidnosnefoeifnsndcsndksmd</P>
    </>
  );
}

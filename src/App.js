import "./App.css";
import { useState } from "react";
import InputValues from "./components/InputValues";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>NBA On Top!</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <InputValues />
    </div>
  );
}

export default App;

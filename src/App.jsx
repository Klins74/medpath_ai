import React from "react";
import { Helmet } from "react-helmet";
import Routes from "./Routes";
import { I18nProvider } from "./contexts/I18nContext";
import "./styles/tailwind.css";
import "./styles/index.css";

function App() {
  return (
    <I18nProvider>
      <div className="App">
        <Helmet>
          <title>MedPath AI - Ваш цифровой навигатор в медицинской карьере</title>
          <meta
            name="description"
            content="MedPath AI - платформа поддержки карьерного развития медицинских специалистов с использованием искусственного интеллекта"
          />
        </Helmet>
        <Routes />
      </div>
    </I18nProvider>
  );
}

export default App;
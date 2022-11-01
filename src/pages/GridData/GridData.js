import React from "react";
// import "./dashboard.css";
import MicroFrontend from "../../MicroFrontend";
import { createBrowserHistory } from "history";
// import { locales } from "../../constant/locales";
// import { Chooser } from "../../Chooser";
// import { getCookie } from "../../utils/CookieHandler";
import Layout from "../../components/Layouts/Layout/Layout";

const defaultHistory = createBrowserHistory();

const GridData = () => {
  const { REACT_APP_IFBA_HOST: ifbaHost } = process.env;
  // const [language, setLanguage] = React.useState("en");
  // const languages = locales.map((e) => e.localeId);

  function IfbaModule({ history }) {
    return <MicroFrontend history={history} host={ifbaHost} name="ifba" />;
  }

  // const langHandler = (value) => {
  //   setLanguage(value);
  //   document.cookie = `LANG=${value}`;
  // };

  return (
    <Layout>
      <div id="ifba">
        <div className="">
          <IfbaModule history={defaultHistory} />
        </div>
      </div>
    </Layout>
  );
};

export default GridData;

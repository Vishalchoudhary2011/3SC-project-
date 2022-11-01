import React from "react";
import MicroFrontend from "../../MicroFrontend";
import Layout from "../../components/Layouts/Layout/Layout";
import { createBrowserHistory } from "history";

const defaultHistory = createBrowserHistory();

const ClientCreation = () => {
  const { REACT_APP_IFBA_HOST: ifbaHost } = process.env;

  function IfbaModule({ history }) {
    return (
      <MicroFrontend history={history} host={ifbaHost} name="client-creation" />
    );
  }

  return (
    <Layout>
      <div id="client-creation">
        <div className="">
          <IfbaModule history={defaultHistory} />
        </div>
      </div>
    </Layout>
  );
};

export default ClientCreation;

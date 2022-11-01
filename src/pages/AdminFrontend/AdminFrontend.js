import React from "react";
import MicroFrontend from "../../MicroFrontend";

import { createBrowserHistory } from "history";
import Layout from "../../components/Layouts/Layout/Layout";

const defaultHistory = createBrowserHistory();

const AdminFrontend = () => {
  const { REACT_APP_IAM_HOST: iamHost } = process.env;

  function IamModule({ history }) {
    return <MicroFrontend history={history} host={iamHost} name="iam" />;
  }

  return (
    <Layout>
      <div id="iam">
        <div>
          <IamModule history={defaultHistory} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminFrontend;

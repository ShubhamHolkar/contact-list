import React from "react";

import { Spinner } from "reactstrap";
const Loader: any = () => {
  return (
    <div className="text-center ">
      <div>
        <Spinner color="primary" type="grow"></Spinner>
        <Spinner color="secondary" type="grow"></Spinner>
        <Spinner color="success" type="grow"></Spinner>
        <Spinner color="danger" type="grow"></Spinner>
        <Spinner color="warning" type="grow"></Spinner>
        <Spinner color="info" type="grow"></Spinner>
        <Spinner color="light" type="grow"></Spinner>
        <Spinner color="dark" type="grow"></Spinner>
      </div>
    </div>
  );
};
export default Loader;

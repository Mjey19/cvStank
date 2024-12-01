import React from "react";
import classes from "./App.module.scss";
import { Form, ResultBlock } from "@/widgets";

export const App = () => {
  return (
    <div className={classes.wrapper}>
      <main>
        <div className={classes.formInner}>
          <Form />
          <ResultBlock />
        </div>
      </main>
    </div>
  );
};

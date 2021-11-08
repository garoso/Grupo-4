import React from "react";
import auth from "./components/login/auth";

export const AppLayout = props => {
  return (
    <div>
      <h1>App Layout</h1>
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

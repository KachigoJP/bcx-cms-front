// React Imports
import React from "react";
import { Link } from "react-router-dom";

// UI Imports
import "scss/common/_404.scss";

// Apps Imports

const Page404: React.FC = () => {
  return (
    <>
      <div className="mainbox">
        <div className="err">404</div>
        <div className="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go <Link to="/">home</Link> and try from there.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page404;

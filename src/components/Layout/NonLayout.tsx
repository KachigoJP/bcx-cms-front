import React from "react";

const Component: React.FC<React.PropsWithChildren> = (props) => {
  React.useEffect(() => {
    document.body.classList.add("nolayout");
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Component;

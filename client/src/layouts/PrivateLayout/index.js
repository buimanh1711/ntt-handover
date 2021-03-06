import { Redirect, Route } from "react-router-dom";

const Private = (props) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) return <Redirect to="/auth/login" />;

  return <Route {...props} />;
};

export default Private;

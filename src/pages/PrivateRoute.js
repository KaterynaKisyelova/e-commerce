import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();

  const jsx = !user ? <Navigate to="/" /> : children;

  return jsx;
};

export default PrivateRoute;

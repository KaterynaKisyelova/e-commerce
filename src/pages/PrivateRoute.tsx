import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  children?: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth0();

  return <>{!user ? <Navigate to="/" /> : children}</>;
};

export default PrivateRoute;

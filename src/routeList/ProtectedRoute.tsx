import { Navigate } from "react-router-dom";

interface Props {
  isAuth: boolean;
  children: JSX.Element;
  hasAccess?: boolean;
}

const ProtectedRoute = ({ isAuth, hasAccess = true, children }: Props) => {
  if (!isAuth) {
    return <Navigate to="/no-auth" replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;

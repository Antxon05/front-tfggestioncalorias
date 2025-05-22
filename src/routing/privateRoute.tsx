import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
  requireToken?: boolean;
  requirePartialRegistry?: boolean;
};

function PrivateRoute({
  children,
  requireToken = true,
  requirePartialRegistry = false,
}: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  const partRegistry = sessionStorage.getItem("parteRegistro");

  if (!token && requireToken) {
    return <Navigate to="/login" />;
  }

  if (!partRegistry && requirePartialRegistry) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;

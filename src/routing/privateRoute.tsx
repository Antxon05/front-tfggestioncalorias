import type { JSX } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
  requireToken?: boolean;
  requirePartialRegistry?: boolean;
  requireRegistryCompleted?: boolean;
};

function PrivateRoute({
  children,
  requireToken = true,
  requirePartialRegistry = false,
  requireRegistryCompleted = false,
}: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  const partRegistry = sessionStorage.getItem("parteRegistro");
  const partRegisterCompleted = sessionStorage.getItem("registroCompletado");

  if (!token && requireToken) {
    return <Navigate to="/login" />;
  }

  if (!partRegistry && requirePartialRegistry) {
    return <Navigate to="/" />;
  }

  if (!partRegisterCompleted && requireRegistryCompleted) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;

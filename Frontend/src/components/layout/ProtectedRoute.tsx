import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type childrenProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: childrenProps) => {
  const { token } = useAppSelector((state) => state.auth);
  console.log(token);

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../models/User";
import { useTypedSelector } from "../../hooks/store";

interface IProtectProps {
  inverse?: boolean;
  staff?: boolean;
  children?: React.ReactElement;
}

const Protect: React.FC<IProtectProps> = ({ children, inverse, staff }) => {
  const user = useTypedSelector((state) => state.auth.user) as User;

  if (staff)
    return <>{user && user.is_staff ? children : <Navigate to="/" />}</>;

  if (!inverse) return <>{user ? children : <Navigate to="/signin" />}</>;
  return <>{user ? <Navigate to="/" /> : children}</>;
};

export default Protect;

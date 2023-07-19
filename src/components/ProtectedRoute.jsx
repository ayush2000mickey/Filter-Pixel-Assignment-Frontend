import { useUserAuth } from "../context/UserAuthContextProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }

  return children;
};

export default ProtectedRoute;

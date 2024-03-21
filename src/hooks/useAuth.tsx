import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";
import { AuthInterface } from "../interfaces";

const AuthContext = createContext({
  user: "",
  login: async (user: string) => {
    console.log(`Logging in user: ${user}`);
  },
  logout: () => {
    console.log("Logging out user");
  },
});

interface Props {
  children: JSX.Element;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useSessionStorage("user", null);

  const navigate = useNavigate();

  const login = async (user: string) => {
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo<AuthInterface>(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

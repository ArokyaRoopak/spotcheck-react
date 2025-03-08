import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useVerify } from "../api/hooks/auth/use-verify";
import { useNavigate } from "react-router-dom";

export interface IUser {
  name: string;
  email: string;
  role: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  user?: IUser;
  login: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>();
  const { verifyUser } = useVerify();

  const login = (currentUser: IUser) => {
    setUser(currentUser);
    setIsAuthenticated(true);
  };
  const logout = () => setIsAuthenticated(false);

  const checkUserAuth = useCallback(async () => {
    const user = await verifyUser();
    if (user) {
      setIsAuthenticated(true);
      login(user);
    } else {
      setIsAuthenticated(false);
    }
  }, [verifyUser]);

  useEffect(() => {
    checkUserAuth();
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

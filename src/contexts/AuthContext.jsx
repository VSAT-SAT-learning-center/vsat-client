import { createContext, useEffect, useReducer } from "react";
import apiClient from "~/services/apiService";
import TokenService from "~/services/tokenService";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: !!TokenService.getAccessToken(),
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
  };

  const login = async ({ username, password }) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });

      const { account, accessToken } = response.data;
      setUser(account);

      // Store access token
      TokenService.setAccessToken(accessToken);

      return account;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    TokenService.removeTokens();
  };

  useEffect(() => {
    const token = TokenService.getAccessToken();
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await apiClient.get("/account/getUserById");
          setUser(response.data.data);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          logout();
        }
      };

      fetchUser();
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        loading: state.loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

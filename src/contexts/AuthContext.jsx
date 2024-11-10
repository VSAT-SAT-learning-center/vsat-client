import { jwtDecode } from "jwt-decode";
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
      const { accessToken } = response.data;

      // Decode the token to get user info and role
      const decodedUser = jwtDecode(accessToken);
      setUser(decodedUser);

      // Store access token
      TokenService.setAccessToken(accessToken);

      return decodedUser;
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
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
    dispatch({ type: "SET_LOADING", payload: false });
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

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

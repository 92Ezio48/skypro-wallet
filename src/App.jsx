import "./App.css";
import "./assets/styles/globals.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header/Header";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;

import "./App.css";
import NotesListPage from "./pages/NotesListPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotePage from "./pages/NotePage";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const myState = useSelector((state) => state.toggleMode);

  return (
    <ToastProvider>
      <Router>
        <AuthProvider>
          <div className={myState === false ? "container" : "container dark"}>
            <Navbar />
            <div className="app">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <NotesListPage />
                    </PrivateRoute>
                  }
                  exact
                ></Route>
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;

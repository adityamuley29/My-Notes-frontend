import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotePage from "./pages/NotePage";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const myState = useSelector((state) => state.toggleMode);

  return (
    <ToastProvider>
      <Router>
        <div className={myState === false ? "container" : "container dark"}>
          <Navbar />
          <div className="app">
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<NotesListPage />} exact />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;

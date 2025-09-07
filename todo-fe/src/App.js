import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BottomNav from "./components/BottomNav";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import TaskListPage from "./pages/TaskListPage";

function AnimateRoutes() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <PageTransition>
                <Dashboard />
              </PageTransition>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/tasks/:type" element={<TaskListPage/>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <AnimateRoutes />
      {!hideNav && <BottomNav />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;

/*
- Nodejs (express)
- react js
- mongodb
- tailwindcss
- swagger
- react-router-dom → routing
- framer-motion → animation
- lucide-react → icon đơn giản, nhẹ

*/

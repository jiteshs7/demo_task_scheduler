import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import TaskForm from "./pages/taskForm/TaskForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/task/:id" element={<TaskForm />} />
        <Route path="/task" element={<TaskForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

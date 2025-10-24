import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PersonList from "./pages/PersonList";
import PersonForm from "./pages/PersonForm";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <PersonList />
          </PrivateRoute>
        }
      />
      <Route
        path="/pessoa/:id"
        element={
          <PrivateRoute>
            <PersonForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/pessoa"
        element={
          <PrivateRoute>
            <PersonForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

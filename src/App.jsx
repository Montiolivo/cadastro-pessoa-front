import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PersonList from "./pages/PersonList";
import PersonForm from "./pages/PersonForm";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<PersonList />} />
        <Route path="/pessoa" element={<PersonForm />} />
        <Route path="/pessoa/:id" element={<PersonForm />} />
      </Route>
    </Routes>
  );
}

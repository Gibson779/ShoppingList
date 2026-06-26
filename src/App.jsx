import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ShoppingList from "./pages/ShoppingList";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={

          <ProtectedRoute>
           <ShoppingList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
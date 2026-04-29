import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ListPage from "./ListPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/list/:listId" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
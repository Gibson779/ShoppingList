import { useParams } from "react-router-dom";
import App from "./App.jsx";

export default function ItemList() {
  const { listId } = useParams();

  return <App listId={listId} />;
}
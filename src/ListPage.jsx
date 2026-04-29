import { useParams } from "react-router-dom";
import App from "./App.jsx";

export default function ListPage() {
  const { listId } = useParams();

  return <App listId={listId} />;
}
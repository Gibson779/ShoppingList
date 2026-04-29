import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function App() {
  const { listId } = useParams(); // 👈 dynamic list ID from URL
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // fallback if no URL provided
  const currentListId = listId || "default-list";

  useEffect(() => {
    const ref = collection(db, "lists", currentListId, "items");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [currentListId]);

  const addItem = async () => {
    if (!input.trim()) return;

    await addDoc(
      collection(db, "lists", currentListId, "items"),
      {
        name: input,
        createdAt: Date.now(),
      }
    );

    setInput("");
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "lists", currentListId, "items", id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Shopping List</h1>

      <p>List ID: <b>{currentListId}</b></p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
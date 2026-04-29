import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const LIST_ID = "shared-list"; // same ID for all users

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "lists", LIST_ID, "items"),
      (snapshot) => {
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return unsubscribe;
  }, []);

  const addItem = async () => {
    if (!input) return;

    await addDoc(collection(db, "lists", LIST_ID, "items"), {
      name: input,
      createdAt: Date.now(),
    });

    setInput("");
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "lists", LIST_ID, "items", id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Shopping List</h1>

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
            <button onClick={() => removeItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

import { signOut } from "firebase/auth";

import { auth, db } from "../firebase";

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ref = collection(
      db,
      "users",
      auth.currentUser.uid,
      "items"
    );

    return onSnapshot(ref, (snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });
  }, []);

  const addItem = async () => {
    if (!input.trim()) return;

    await addDoc(
      collection(
        db,
        "users",
        auth.currentUser.uid,
        "items"
      ),
      {
        name: input,
        createdAt: Date.now()
      }
    );

    setInput("");
  };

  const removeItem = async (id) => {
    await deleteDoc(
      doc(
        db,
        "users",
        auth.currentUser.uid,
        "items",
        id
      )
    );
  };

  return (
    <div>
      <h2>
        Welcome {auth.currentUser.email}
      </h2>

      <button onClick={() => signOut(auth)}>
        Sign Out
      </button>

      <input
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
      />

      <button onClick={addItem}>
        Add
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}

            <button
              onClick={() =>
                removeItem(item.id)
              }
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    navigate("/list");
  };

  const register = async () => {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    navigate("/list");
  };

  return (
    <div>
      <h1>Shopping List</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={login}>
        Login
      </button>

      <button onClick={register}>
        Register
      </button>
    </div>
  );
}
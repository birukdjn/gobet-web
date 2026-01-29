"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const submit = async () => {
    await api.post("/Auth/forgot-password", { email });
    alert("Reset link sent");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Forgot Password</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <button onClick={submit}>Send</button>
    </div>
  );
}

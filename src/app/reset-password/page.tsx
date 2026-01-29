"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  const submit = async () => {
    await api.post("/Auth/reset-password", form);
    alert("Password reset successful");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Reset Password</h2>
      {Object.keys(form).map((k) => (
        <input
          key={k}
          placeholder={k}
          type={k.includes("Password") ? "password" : "text"}
          value={(form as any)[k]}
          onChange={(e) =>
            setForm({ ...form, [k]: e.target.value })
          }
        />
      ))}
      <br />
      <button onClick={submit}>Reset</button>
    </div>
  );
}

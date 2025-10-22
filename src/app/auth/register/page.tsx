"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    postal_code: "",
    street: "",
    house_number: "",
  });

  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Magyar telefonszám validáció
  const isPhoneValid = (phone: string) => {
    return /^(\+36|06)(20|30|31|70|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\s?\d{3}\s?\d{4}$/.test(
      phone
    );
  };

  // ✅ Email formátum + domain elgépelés-ellenőrzés
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "freemail.hu",
    "citromail.hu",
    "protonmail.com",
  ];

  const levenshtein = (a: string, b: string) => {
    const matrix = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  };

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkEmailWarning = (email: string) => {
    const domain = email.split("@")[1];
    if (!domain) return null;

    const closest = commonDomains.find(
      (d) => Math.abs(d.length - domain.length) < 4 && levenshtein(d, domain) <= 2
    );

    if (closest && closest !== domain) {
      return `Biztosan jól írta az email címet? Lehet, hogy "${closest}" helyett "${domain}" szerepel.`;
    }

    return null;
  };

  // ✅ Összes mező validálása
  const validate = () => {
    if (!form.full_name.trim().includes(" "))
      return "Kérlek, add meg a teljes neved (vezetéknév + keresztnév)!";
    if (!form.email.trim()) return "Az email megadása kötelező!";
    if (!isEmailValid(form.email))
      return "Adj meg érvényes email címet (pl. valami@email.hu)!";
    if (form.password.length < 6)
      return "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
    if (!isPhoneValid(form.phone))
      return "Adj meg érvényes magyar telefonszámot (pl. +36 20 123 4567)!";
    if (!form.city || form.city.length < 2)
      return "Város megadása kötelező!";
    if (!form.postal_code.match(/^\d{4}$/))
      return "Adj meg érvényes, 4 számjegyű irányítószámot!";
    if (!form.street.trim()) return "Közterület megadása kötelező!";
    if (!form.house_number.trim()) return "Házszám megadása kötelező!";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      const warn = checkEmailWarning(value);
      setWarning(warn || "");
    }
  };

  const handleRegister = async () => {
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // 1️⃣ Regisztráció Supabase-ben
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // 2️⃣ Profil létrehozása
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          city: form.city.trim(),
          postal_code: form.postal_code.trim(),
          street: form.street.trim(),
          house_number: form.house_number.trim(),
          created_when: new Date(),
        },
      ]);

      if (profileError) {
        console.error(profileError);
        setError("Sikeres regisztráció, de hiba történt a profil mentésekor.");
      }
    }

    setLoading(false);
    alert("Sikeres regisztráció! Kérlek, ellenőrizd az emailed a megerősítéshez.");
    router.push("/auth/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center text-amber-700">
        Regisztráció
      </h1>

      {error && (
        <div className="mb-4 text-center text-sm text-red-600 bg-red-100 p-2 rounded-lg">
          {error}
        </div>
      )}

      {warning && !error && (
        <div className="mb-4 text-center text-sm text-yellow-700 bg-yellow-100 p-2 rounded-lg">
          {warning}
        </div>
      )}

      <div className="space-y-3">
        <input
          type="text"
          name="full_name"
          placeholder="Teljes név"
          value={form.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefonszám (+36 20 123 4567)"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="Város"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Irányítószám (pl. 1011)"
          value={form.postal_code}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Közterület (pl. Fő utca)"
          value={form.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="house_number"
          placeholder="Házszám (pl. 12/B)"
          value={form.house_number}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-amber-600 text-white py-2 mt-5 rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
      >
        {loading ? "Regisztráció folyamatban..." : "Regisztráció"}
      </button>
    </div>
  );
}

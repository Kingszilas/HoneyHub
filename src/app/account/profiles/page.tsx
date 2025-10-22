"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    city: "",
    postal_code: "",
    street: "",
    house_number: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setForm({
        full_name: data.full_name || "",
        phone: data.phone || "",
        city: data.city || "",
        postal_code: data.postal_code || "",
        street: data.street || "",
        house_number: data.house_number || "",
      });
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validáció
  const validate = () => {
    const isPhoneValid = (phone: string) => {
  // Magyarországon: +36 XX XXX XXXX vagy 06XX XXX XXXX
  return /^(\+36|06)(20|30|31|70|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\s?\d{3}\s?\d{4}$/.test(
    phone
  );
};

    if (!form.full_name.trim().includes(" "))
      return "Kérlek, add meg a teljes neved (vezetéknév + keresztnév)!";
    if (!isPhoneValid(form.phone))
      return "Adj meg érvényes telefonszámot (pl. +36 20 123 4567)!";
    if (!form.city || form.city.length < 2)
      return "Város megadása kötelező!";
    if (!form.postal_code.match(/^\d{4}$/))
      return "Adj meg érvényes, 4 számjegyű irányítószámot!";
    if (!form.street.trim())
      return "Közterület megadása kötelező!";
    if (!form.house_number.trim())
      return "Házszám megadása kötelező!";
    return "";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        postal_code: form.postal_code.trim(),
        street: form.street.trim(),
        house_number: form.house_number.trim(),
        updated_when: new Date(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error(updateError);
      setMessage("Hiba történt a mentés során, próbáld újra.");
    } else {
      setMessage("Profil sikeresen frissítve!");
      setTimeout(() => router.push("/account"), 1500);
    }
    setLoading(false);
  };

  if (!user) return <p className="text-center mt-20">Kérlek, jelentkezz be.</p>;
  if (loading) return <p className="text-center mt-20">Betöltés...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-amber-700">
        Személyes adatok módosítása
      </h1>

      {message && (
        <div className="mb-4 text-center text-sm text-amber-700 bg-amber-100 p-2 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-medium mb-1">Teljes név</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Pl. Kiss Péter"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Telefonszám</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="+36 20 123 4567"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Város</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Budapest"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Irányítószám</label>
          <input
            type="text"
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="1011"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Közterület</label>
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Fő utca"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Házszám</label>
          <input
            type="text"
            name="house_number"
            value={form.house_number}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="12/B"
          />
        </div>

        <div className="sm:col-span-2 text-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
          >
            {loading ? "Mentés..." : "Adatok mentése"}
          </button>
        </div>
      </form>
    </div>
  );
}

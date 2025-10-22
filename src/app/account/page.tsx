"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  // --- Státusz színek ---
  const STATUS_COLORS: Record<string, string> = {
    "Beérkezett": "text-amber-600",
    "Fizetett": "text-blue-600",
    "Feldolgozás folyamatban": "text-indigo-600",
    "szállítás alatt": "text-purple-600",
    "Teljesített": "text-green-600",
    "Törölt": "text-red-600",
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) console.error("Profile error:", error);
    else setProfile(data);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          quantity,
          price,
          products (id, name, image_url)
        )
      `)
      .eq("user_id", user.id)
      .order("created_when", { ascending: false });

    if (error) console.error("Orders error:", error);
    else setOrders(data ?? []);
  };

  const toggleOrder = (orderId: number) => {
    const newSet = new Set(expandedOrders);
    if (newSet.has(orderId)) newSet.delete(orderId);
    else newSet.add(orderId);
    setExpandedOrders(newSet);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = confirm(
      "Biztosan törölni szeretnéd a fiókodat? Ez végleges és nem visszavonható."
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();

      if (data.error) {
        alert("Hiba történt a törlés során: " + data.error);
      } else {
        alert("Fiókod és személyes adataid törlésre kerültek.");
        await supabase.auth.signOut();
        router.push("/");
      }
    } catch (err: any) {
      console.error("Account deletion error:", err);
      alert("Hiba történt a fiók törlése közben: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <p className="text-lg font-semibold">
          Jelentkezz be a rendeléseid megtekintéséhez!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Fiókom és Rendeléseim
      </h1>

      {/* --- Személyes adatok --- */}
      {profile && (
        <section className="mb-8 bg-white shadow-lg rounded-2xl p-6 border border-amber-100">
          <h2 className="text-2xl font-semibold text-amber-700 mb-6">Személyes adatok</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
            <div>
              <p className="text-sm font-medium text-gray-500">Teljes név</p>
              <p className="text-lg">{profile.full_name || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">E-mail</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Telefonszám</p>
              <p className="text-lg">{profile.phone || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Város</p>
              <p className="text-lg">{profile.city || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Irányítószám</p>
              <p className="text-lg">{profile.postal_code || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Utca, házszám</p>
              <p className="text-lg">
                {profile.street || "-"} {profile.house_number || ""}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/account/profiles"
              className="inline-block bg-amber-600 text-white px-6 py-2.5 rounded-lg hover:bg-amber-700 transition font-medium"
            >
              Adatok módosítása
            </Link>

            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="inline-block bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Fiók törlése
            </button>
          </div>
        </section>
      )}

      {/* --- Rendelések --- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Korábbi rendeléseim</h2>
        {orders.length === 0 ? (
          <p>Még nem adtál le rendelést.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              const totalAmount = order.order_items.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0
              );

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Rendelés #{order.id}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.created_when).toLocaleDateString("hu-HU")}
                      </p>
                      <p className="mt-1 font-semibold">
                        Összeg: {totalAmount.toLocaleString("hu-HU")} Ft
                      </p>
                      <p
                        className={`mt-1 font-semibold ${STATUS_COLORS[order.status] || "text-gray-600"}`}
                      >
                        Státusz: {order.status}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="text-amber-600 font-medium hover:underline"
                    >
                      {isExpanded ? "Részletek elrejtése" : "Részletek"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 border-t pt-4 space-y-4">
                      {/* Termékek */}
                      {order.order_items.map((item: any) => (
                        <div key={item.products.id} className="flex gap-4">
                          {item.products.image_url && (
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={item.products.image_url}
                                alt={item.products.name}
                                fill
                                className="object-cover rounded-xl"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{item.products.name}</p>
                            <p className="text-sm text-gray-600">
                              Mennyiség: {item.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              Ár / db: {item.price.toLocaleString("hu-HU")} Ft
                            </p>
                            <p className="text-sm text-gray-600">
                              Összesen: {(item.price * item.quantity).toLocaleString("hu-HU")} Ft
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Számlázási adatok */}
                      {order.billing_address && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Számlázási adatok</h4>
                          <p><strong>Név:</strong> {order.billing_address.name}</p>
                          <p><strong>E-mail:</strong> {order.billing_address.email}</p>
                          <p><strong>Telefonszám:</strong> {order.billing_address.phone}</p>
                          <p>
                            <strong>Cím:</strong> {order.billing_address.postal_code} {order.billing_address.city}, {order.billing_address.street} {order.billing_address.house_number}
                          </p>
                        </div>
                      )}

                      {/* Szállítási adatok */}
                      {order.shipping && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Szállítási adatok</h4>
                          <p><strong>Név:</strong> {order.shipping.name}</p>
                          <p><strong>E-mail:</strong> {order.shipping.email}</p>
                          <p><strong>Telefonszám:</strong> {order.shipping.phone}</p>
                          <p>
                            <strong>Cím:</strong> {order.shipping.postal_code} {order.shipping.city}, {order.shipping.street} {order.shipping.house_number}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

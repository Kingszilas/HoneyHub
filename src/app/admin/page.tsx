"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type OrderItem = {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  user_id: string;
  total_amount: number;
  status: string;
  shipping: any;
  billing_address: any;
  created_when: string;
  updated_when: string;
  order_items: OrderItem[];
};

const STATUS_OPTIONS = [
  "Beérkezett",
  "Fizetett",
  "Feldolgozás folyamatban",
  "szállítás alatt",
  "Teljesített",
  "Törölt",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          product_id,
          quantity,
          price,
          products (name)
        )
      `)
      .order("created_when", { ascending: false });

    if (error) console.error(error);
    else {
      // Flatten product name from joined table
      const formattedOrders = data?.map((o: any) => ({
        ...o,
        order_items: o.order_items.map((item: any) => ({
          product_id: item.product_id,
          name: item.products?.name,
          quantity: item.quantity,
          price: item.price,
        })),
      })) || [];

      setOrders(formattedOrders);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setLoading(true);
    try {
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_when: new Date().toISOString() })
        .eq("id", orderId);

      if (updateError) throw updateError;

      const { error: historyError } = await supabase
        .from("order_status_history")
        .insert([{ order_id: orderId, status: newStatus }]);

      if (historyError) throw historyError;

      fetchOrders();
    } catch (err) {
      console.error("Státusz változtatás hiba:", err);
      alert("Hiba történt a státusz frissítésénél.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin - Rendelések</h1>

      {loading && <p className="text-center mb-4">Betöltés...</p>}

      {orders.length === 0 ? (
        <p className="text-center">Nincsenek rendelések.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-2xl p-4 border border-amber-100"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">
                    Rendelés #{order.id} - Összeg:{" "}
                    {order.total_amount.toLocaleString("hu-HU")} Ft
                  </p>
                  <p className="text-sm text-gray-500">
                    Létrehozva:{" "}
                    {new Date(order.created_when).toLocaleString("hu-HU")}
                  </p>
                </div>

                <select
                  className="border rounded px-2 py-1"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-1">Szállítási adatok</h4>
                  <p>{order.shipping?.name}</p>
                  <p>{order.shipping?.email}</p>
                  <p>{order.shipping?.phone}</p>
                  <p>
                    {order.shipping?.postal_code} {order.shipping?.city},{" "}
                    {order.shipping?.street} {order.shipping?.house_number}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Számlázási adatok</h4>
                  <p>{order.billing_address?.name}</p>
                  <p>{order.billing_address?.email}</p>
                  <p>{order.billing_address?.phone}</p>
                  <p>
                    {order.billing_address?.postal_code}{" "}
                    {order.billing_address?.city},{" "}
                    {order.billing_address?.street}{" "}
                    {order.billing_address?.house_number}
                  </p>
                </div>
              </div>

              {/* --- Rendelés tételek --- */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Rendelés tételek</h4>
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1 text-left">Termék</th>
                      <th className="border px-2 py-1 text-center">Mennyiség</th>
                      <th className="border px-2 py-1 text-right">Ár / db</th>
                      <th className="border px-2 py-1 text-right">Összesen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item) => (
                      <tr key={item.product_id}>
                        <td className="border px-2 py-1">{item.name}</td>
                        <td className="border px-2 py-1 text-center">{item.quantity}</td>
                        <td className="border px-2 py-1 text-right">
                          {item.price.toLocaleString("hu-HU")} Ft
                        </td>
                        <td className="border px-2 py-1 text-right">
                          {(item.price * item.quantity).toLocaleString("hu-HU")} Ft
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

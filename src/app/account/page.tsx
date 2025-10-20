"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

export default function AccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, products(name, image_url)")
      .eq("user_id", user.id)
      .order("created_when", { ascending: false });
    if (error) console.error(error);
    else setOrders(data ?? []);
  };

  if (!user) return <p>Jelentkezz be a rendeléseid megtekintéséhez!</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Saját Rendeléseim</h1>
      {orders.length === 0 && <p>Még nem adtál le rendelést.</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="p-4 border rounded mb-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{order.products?.name}</p>
              <p>Mennyiség: {order.quantity}</p>
              <p>Összeg: {order.amount} Ft</p>
              <p>Status: {order.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

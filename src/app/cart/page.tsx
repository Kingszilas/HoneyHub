"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, Minus, Plus } from "lucide-react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phone: "",
    postal_code: "",
    city: "",
    street: "",
    house_number: "",
  });

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    postal_code: "",
    city: "",
    street: "",
    house_number: "",
  });

  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true);
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- Felhasználó betöltése sessionből ---
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setIsLoadingUser(false);
    };
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.push("/auth/login");
    }
  }, [isLoadingUser, user, router]);

  // --- Profil betöltése ---
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profil fetch error:", error);
        return;
      }

      setProfile(data);

      const profileData = {
        name: data.full_name || "",
        email: data.email || user.email || "",
        phone: data.phone || "",
        postal_code: data.postal_code || "",
        city: data.city || "",
        street: data.street || "",
        house_number: data.house_number || "",
      };

      setBilling(profileData);
      setShipping(profileData);
    };

    fetchProfile();
  }, [user]);

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone: string) =>
    /^(?:\+36|06)(20|30|70|31|32|33|34|35|36|37|50|52|53|56|59|1\d)\s?\d{3}\s?\d{3,4}$/.test(phone);
  const isPostalValid = (pc: string) => /^\d{4}$/.test(pc);

  const isFormValid =
    billing.name.trim() !== "" &&
    isEmailValid(billing.email) &&
    isPhoneValid(billing.phone) &&
    isPostalValid(billing.postal_code) &&
    billing.city.trim() !== "" &&
    billing.street.trim() !== "" &&
    billing.house_number.trim() !== "";

  const handleBillingChange = (field: string, value: string) => {
    const updated = { ...billing, [field]: value };
    setBilling(updated);
    if (shippingSameAsBilling) {
      setShipping(updated);
    }
  };

  const handleShippingChange = (field: string, value: string) => {
    setShipping({ ...shipping, [field]: value });
  };

  const handleShippingCheckbox = (checked: boolean) => {
    setShippingSameAsBilling(checked);
    if (checked) setShipping({ ...billing });
  };

  const handleCheckout = async () => {
    if (!isFormValid || items.length === 0) {
      toast({ title: "Hiba", description: "Kérlek, töltsd ki a vásárlói adatokat helyesen!" });
      return;
    }

    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();

    const payload = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      userId: user.id,
      billing,
      shipping,
    };

    try {
      const res = await fetchWithAuth("/api/checkout", {
        method: "POST",
        json: payload,
                //headers: { "Content-Type": "application/json" ,
          //         "Authorization": `Bearer ${session?.access_token}`
            //       },
        //body: JSON.stringify(payload),

      });

      //if (!res.ok) throw new Error("Hiba történt a rendelés során");
      if (!res.success) {
  throw new Error("Ismeretlen hiba");
}

      toast({ title: "Siker!", description: "Rendelés elküldve és elmentve." });
      clearCart();
    } catch (err) {
      console.error(err);
      toast({ title: "Hiba", description: "Nem sikerült elküldeni a rendelést." });
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <p className="text-lg font-semibold">Betöltés...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-48 flex items-center justify-center bg-amber-100">
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-amber-900">Kosár</h1>
      </section>

      <section className="flex-grow container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-lg mb-6">A kosarad üres.</p>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Vissza a termékekhez
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <Card key={item.id} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="relative w-full md:w-48 h-48">
                    <Image src={item.image ?? "/placeholder.png"} alt={item.name} fill className="object-cover" />
                  </div>
                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <div className="flex items-center gap-3 mt-3">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-3 font-semibold">{item.price.toLocaleString("hu-HU")} Ft / db</p>
                      <p className="text-muted-foreground">Összesen: {(item.price * item.quantity).toLocaleString("hu-HU")} Ft</p>
                    </div>
                    <Button onClick={() => removeFromCart(item.id)} variant="destructive" className="mt-4 self-start">
                      <Trash2 className="mr-2 h-4 w-4" /> Törlés
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Összegzés és adatok</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold mb-4">Összesen: {total.toLocaleString("hu-HU")} Ft</p>
                  
                  <h3 className="font-semibold mb-2">Számlázási adatok</h3>
                  {Object.entries(billing).map(([key, value]) => (
                    <label key={key} className="flex flex-col mb-2 capitalize">
                      {key.replace("_"," ")}
                      <input
                        type="text"
                        value={value}
                        onChange={e => handleBillingChange(key, e.target.value)}
                        className="border rounded p-2 mt-1"
                        required
                      />
                    </label>
                  ))}

                  <label className="flex items-center gap-2 mt-2 mb-4">
                    <input type="checkbox" checked={shippingSameAsBilling} onChange={e => handleShippingCheckbox(e.target.checked)} />
                    Szállítási cím megegyezik a számlázási címmel
                  </label>

                  {!shippingSameAsBilling && (
                    <>
                      <h3 className="font-semibold mb-2">Szállítási adatok</h3>
                      {Object.entries(shipping).map(([key, value]) => (
                        <label key={key} className="flex flex-col mb-2 capitalize">
                          {key.replace("_"," ")}
                          <input
                            type="text"
                            value={value}
                            onChange={e => handleShippingChange(key, e.target.value)}
                            className="border rounded p-2 mt-1"
                            required
                          />
                        </label>
                      ))}
                    </>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <Button onClick={handleCheckout} disabled={loading || !isFormValid} className="w-full">
                    {loading ? "Küldés..." : "Tovább a megrendeléshez"}
                  </Button>
                  <Button onClick={clearCart} variant="outline" className="w-full">Kosár ürítése</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

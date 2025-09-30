"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PrimaryButton } from "@/components/PrimaryButton";

const COOKIE_NAME = "hh_cookie_prefs_v1";

type Prefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts?: string;
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
  const raw = Cookies.get(COOKIE_NAME);
  if (raw) {
    try {
      const savedPrefs = JSON.parse(raw) as Prefs;
      setPrefs(savedPrefs);

      // 🔥 GA betöltése, ha engedélyezve
      if (savedPrefs.analytics) {
        loadGoogleAnalytics("G-3CLGXQWHE6"); 
      }

    } catch {
      setOpen(true); // hibás cookie esetén nyitjuk
    }
  } else {
    setOpen(true); // nincs cookie, nyitjuk
  }

    // 🔄 Globális újranyitás gombhoz
    (window as any).openCookieConsent = () => setOpen(true);
  }, []);

  function save(close = true) {
    const payload: Prefs = {
      necessary: true,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      ts: new Date().toISOString(),
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(payload), {
      expires: 365,
      sameSite: "Lax",
      secure: true,
    });

    if (payload.analytics) {
      loadGoogleAnalytics("G-3CLGXQWHE6"); // <-- saját Measurement ID
    }

    if (close) setOpen(false);
  }

  function loadGoogleAnalytics(measurementId: string) {
    if (document.getElementById("ga-script")) return;
    const s = document.createElement("script");
    s.id = "ga-script";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(s);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId);
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:right-8 md:left-auto z-50">
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-3xl mx-auto">
        <h3 className="font-semibold text-lg mb-3">Cookie beállítások</h3>
        <p className="text-sm text-gray-700 mb-4">
          Az oldalunk cookie-kat használ az alapműködéshez, valamint (ha hozzájárulsz) elemzéshez és marketinghez.
        </p>

        <div className="flex flex-col gap-3 mb-4">
          {/* Checkboxok */}
          <label className="flex items-center gap-2">
            <input type="checkbox" checked disabled />
            Szükséges cookie
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
            />
            Analitikai cookie
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={prefs.marketing}
              onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
            />
            Marketing cookie
          </label>
        </div>

        {/* Mentés gomb */}
        <div className="flex gap-2">
          <PrimaryButton onClick={() => save(true)}>Mentés</PrimaryButton>
        </div>

        <div className="mt-4 text-xs text-gray-600">
          <a href="/cookie-policy" className="underline">
            Részletes cookie szabályzat
          </a>
        </div>
      </div>
    </div>
  );
}

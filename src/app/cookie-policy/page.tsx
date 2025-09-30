"use client";

import Link from "next/link";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function CookiePolicyPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-headline font-bold text-amber-800 mb-6">
                Sütiszabályzat
            </h1>

            <p className="mb-4 text-gray-700">
                Ez a tájékoztató bemutatja, milyen sütiket használunk a VitézMéz
                weboldalon, és mire szolgálnak ezek. A sütik segítik a weboldal
                működését, az analitikai méréseket és marketing célokat.
            </p>

            <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
                1. Szükséges sütik
            </h2>
            <p className="mb-2 text-gray-700">
                Ezek a sütik a weboldal alapvető működéséhez szükségesek, például a
                kosár, űrlapok, nyelvi beállítások és munkamenet-kezelés miatt.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Név:</strong> session_id</li>
                <li><strong>Élettartam:</strong> böngészés végéig</li>
                <li><strong>Forrás:</strong> weboldal (Next.js / front-end)</li>
                <li><strong>Cél:</strong> munkamenet azonosítása, megrendelések és űrlapadatok kezelése</li>
            </ul>

            <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
                2. Analitikai sütik
            </h2>
            <p className="mb-2 text-gray-700">
                Ezek a sütik segítenek megérteni, hogyan használják a látogatók az
                oldalt. Csak akkor kerülnek telepítésre, ha hozzájárulsz az analitika sütikhez.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Név:</strong> _ga, _gid</li>
                <li><strong>Élettartam:</strong> _ga: 2 év, _gid: 24 óra</li>
                <li><strong>Forrás:</strong> Google Analytics (csak hozzájárulás esetén)</li>
                <li><strong>Cél:</strong> látogatói viselkedés elemzése, statisztikák készítése</li>
            </ul>

            <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
                3. Marketing sütik
            </h2>
            <p className="mb-2 text-gray-700">
                Ezeket a sütiket hirdetési és marketing célokra használjuk. Csak akkor
                kerülnek telepítésre, ha hozzájárulsz a marketing sütikhez.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
                <li><strong>Név:</strong> _fbp</li>
                <li><strong>Élettartam:</strong> 3 hónap</li>
                <li><strong>Forrás:</strong> Facebook Pixel (csak hozzájárulás esetén)</li>
                <li><strong>Cél:</strong> célzott hirdetések, marketing elemzések</li>
            </ul>

            <p className="mt-8 text-gray-700">
                A sütibeállításaidat bármikor módosíthatod az oldal alján található
                <strong> Süti beállítások </strong> gomb segítségével. További
                információk az adataid kezeléséről az{" "}
                <Link href="/privacy-policy" className="underline text-amber-700">
                    Adatvédelmi tájékoztató
                </Link> oldalon találhatók.
            </p>

            <div className="mt-6 text-center">
                <PrimaryButton
                    onClick={() => (window as any).openCookieConsent?.()}
                >
                    Süti beállítások módosítása
                </PrimaryButton>
            </div>
        </div>
    );
}

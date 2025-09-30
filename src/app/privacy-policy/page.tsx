import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatvédelmi tájékoztató | VitézMéz",
  description: "Tájékoztató a személyes adatok kezeléséről a VitézMéz weboldalon.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-headline font-bold text-amber-800 mb-6">
        Adatvédelmi tájékoztató
      </h1>

      <p className="mb-4 text-gray-700">
        A VitézMéz (továbbiakban: Adatkezelő) elkötelezett a személyes adatok
        védelme iránt. Az alábbi tájékoztató ismerteti, hogyan gyűjtjük,
        használjuk és védjük a weboldalunkon megadott adatokat.
      </p>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        1. Adatkezelő adatai
      </h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li><strong>Cégnév:</strong> VitézMéz Kft.</li>
        <li><strong>Cím:</strong> 1234 Budapest, Méz utca 1.</li>
        <li><strong>Email:</strong> info@vitezmez.hu</li>
        <li><strong>Telefon:</strong> +36 30 123 4567</li>
      </ul>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        2. Kezelt adatok köre
      </h2>
      <p className="text-gray-700 mb-2">
        Weboldalunkon az alábbi adatokat kezeljük:
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Név, email cím, telefonszám – rendelés vagy kapcsolatfelvétel esetén</li>
        <li>IP-cím és sütik az oldal működéséhez, analitikához és marketinghez</li>
      </ul>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        3. Adatkezelés célja és jogalapja
      </h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Rendelések teljesítése – szerződés teljesítése (GDPR 6. cikk (1) b))</li>
        <li>Kapcsolatfelvétel – jogos érdek vagy hozzájárulás</li>
        <li>Analitikai és marketing célok – felhasználói hozzájárulás alapján (GDPR 6. cikk (1) a))</li>
      </ul>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        4. Adatok tárolási ideje
      </h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Rendelési adatok: 5 év, a számviteli törvénynek megfelelően</li>
        <li>Emailes kapcsolati adatok: a kapcsolat lezárásáig vagy törlésig</li>
        <li>Sütik: session cookie – böngészés végéig, analitikai cookie – 2 év, marketing cookie – 3 hónap</li>
      </ul>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        5. Adatbiztonság
      </h2>
      <p className="mb-4 text-gray-700">
        Az adatokat biztonságos szervereken tároljuk, hozzáférést csak az arra jogosult személyek kapnak. Megfelelő technikai és szervezési intézkedésekkel védjük az adatokhoz való illetéktelen hozzáférést.
      </p>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        6. Felhasználói jogok
      </h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Hozzáférés a személyes adatokhoz</li>
        <li>Adatok helyesbítése</li>
        <li>Adatok törlése („elfeledtetéshez való jog”)</li>
        <li>Adatkezelés korlátozása</li>
        <li>Hozzájárulás visszavonása (analitikai és marketing sütik esetén)</li>
        <li>Adathordozhatósághoz való jog</li>
        <li>Jogorvoslati lehetőség a NAIH-nál (Nemzeti Adatvédelmi és Információszabadság Hatóság)</li>
      </ul>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        7. Kapcsolat az adatvédelmi tisztviselővel
      </h2>
      <p className="mb-4 text-gray-700">
        Adatvédelmi kérdések esetén fordulj az adatvédelmi tisztviselőhöz:
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Email: privacy@vitezmez.hu</li>
        <li>Telefon: +36 30 123 4567</li>
      </ul>

      <h2 className="text-xl font-semibold text-amber-700 mt-8 mb-3">
        8. Jogszabályi háttér
      </h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>GDPR (2016/679/EU) – Általános adatvédelmi rendelet</li>
        <li>2011. évi CXII. törvény – Információs önrendelkezési jogról és az információszabadságról</li>
      </ul>

      <p className="mt-8 text-gray-700">
        Az oldal használatával a felhasználó elfogadja a sütik és személyes adatok kezelését a fent leírtak szerint.  
        További információk a <a href="/cookie-policy" className="underline">sütiszabályzatban</a>.
      </p>
    </div>
  );
}

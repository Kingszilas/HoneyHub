import React from "react";

type Language = "hu" | "en";

interface QuoteProps {
  lang: Language;
}

const quotes = {
  hu: [
    { text: "A méz az istenek eledele, a természet ajándéka, mely édesebbé teszi az életet.", author: "Egy magyar méhész" },
    { text: "A méhek munkája a természet egyik legtökéletesebb csodája.", author: "Victor Hugo" },
    { text: "Aki a mézet szereti, a munkát is szereti.", author: "Ismeretlen" },
    { text: "A méhek nemcsak a virágokat, hanem a lelkünket is gazdagítják.", author: "Kahlil Gibran" },
    { text: "A méh a szorgalom és együttműködés mintája.", author: "Ismeretlen" },
  ],
  en: [
    { text: "Life is the flower for which love is the honey.", author: "Victor Hugo" },
    { text: "The work of bees is one of nature's most perfect wonders.", author: "Victor Hugo" },
    { text: "He who loves honey, loves labor too.", author: "Unknown" },
    { text: "Bees enrich not only the flowers but also our soul.", author: "Kahlil Gibran" },
    { text: "The bee is a model of diligence and cooperation.", author: "Unknown" },
  ],
};

export default function Quote({ lang }: QuoteProps) {
  // Véletlenszerűen választ egy idézetet a megfelelő nyelvből
  const randomQuote = quotes[lang][Math.floor(Math.random() * quotes[lang].length)];

  return (
    <section className="py-12 px-6 text-center my-10">
      <blockquote className="text-2xl font-semibold italic">
        “{randomQuote.text}”
      </blockquote>
      <p className="mt-4">– {randomQuote.author}</p>
    </section>
  );
}

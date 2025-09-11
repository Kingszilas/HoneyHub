"use client";

import { useLanguage } from "@/contexts/language-context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-honeycomb-realistic">
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-headline text-4xl font-bold text-center mb-12 text-white drop-shadow">
          {t("about.title")}
        </h1>
        <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8 text-foreground">
          <p className="mb-6">
            {t("about.intro")}
          </p>
          <p className="mb-6">
            {t("about.history")}
          </p>
          <p>
            {t("about.mission")}
          </p>
        </div>
      </div>
    </div>
  );
}

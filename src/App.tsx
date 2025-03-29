import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ChefHat,
  UtensilsCrossed,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Palmtree as PalmTree,
  Coffee,
  Sun,
} from "lucide-react";
import { LanguageSelector } from "./components/LanguageSelector";
import { Menu } from "./components/Menu";
import SEO from "./components/SEO";
import { pageSeoConfig } from "./lib/seo-config";

function App() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<
    "home" | "about" | "services" | "menu" | "contact"
  >("home");

  // Set up intersection observer to track the active section
  useEffect(() => {
    const sections = ["about", "services", "gallery", "menu", "contact"];
    const observers: IntersectionObserver[] = [];

    // Clean up function to disconnect all observers
    const cleanUp = () => {
      observers.forEach((observer) => observer.disconnect());
    };

    // Set up an observer for each section
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section as any);
            }
          });
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
      );

      observer.observe(element);
      observers.push(observer);
    });

    return cleanUp;
  }, []);

  return (
    <div className="min-h-screen bg-coconut font-sans">
      <SEO
        section={activeSection}
        title={pageSeoConfig[activeSection]?.title}
        description={pageSeoConfig[activeSection]?.description}
      />
      <LanguageSelector />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://bvmtvngcdnruvctkrclx.supabase.co/storage/v1/object/public/images//ChatGPT%20Image%20Mar%2029,%202025,%2003_04_56%20PM.png"
            alt="Chef Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brazil-blue/50 to-brazil-green/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-brazil-yellow mb-6 drop-shadow-lg">
              Valerio Carlos
            </h1>
            <p className="text-2xl md:text-3xl text-white font-light">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto" id="about">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://bvmtvngcdnruvctkrclx.supabase.co/storage/v1/object/public/images//IMG_3027.jpg?auto=format&fit=crop&q=80"
              alt="Chef Valério"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <ChefHat className="w-10 h-10 text-brazil-green" />
              <h2 className="font-display text-4xl font-bold text-brazil-blue">
                {t("about.title")}
              </h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t("about.bio1")}
            </p>
            <p className="text-gray-700 leading-relaxed">{t("about.bio2")}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="bg-tropical-pattern bg-fixed bg-cover py-20 px-4 md:px-8"
        id="services"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <PalmTree className="w-8 h-8 text-brazil-yellow" />
              <h2 className="font-display text-4xl font-bold text-white">
                {t("services.title")}
              </h2>
              <Coffee className="w-8 h-8 text-brazil-yellow" />
            </div>
            <p className="text-white/90 text-xl">{t("services.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-display font-semibold mb-4 text-brazil-green">
                {t("services.private.title")}
              </h3>
              <p className="text-gray-700">
                {t("services.private.description")}
              </p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-display font-semibold mb-4 text-brazil-green">
                {t("services.catering.title")}
              </h3>
              <p className="text-gray-700">
                {t("services.catering.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto" id="gallery">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Sun className="w-8 h-8 text-tropical-orange" />
          <h2 className="font-display text-4xl font-bold text-brazil-blue">
            {t("gallery.title")}
          </h2>
          <Sun className="w-8 h-8 text-tropical-orange" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "https://bvmtvngcdnruvctkrclx.supabase.co/storage/v1/object/public/images//Screenshot%202025-03-29%20at%2011.59.01.png?auto=format&fit=crop&q=80",
            "https://bvmtvngcdnruvctkrclx.supabase.co/storage/v1/object/public/images//Screenshot%202025-03-29%20at%2011.58.53.png?auto=format&fit=crop&q=80",
            "https://bvmtvngcdnruvctkrclx.supabase.co/storage/v1/object/public/images//Screenshot%202025-03-29%20at%2011.58.39.png?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80",
          ].map((url, index) => (
            <div
              key={index}
              className="relative overflow-hidden group rounded-2xl shadow-lg"
            >
              <img
                src={url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brazil-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <Menu />

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto" id="contact">
        <h2 className="font-display text-4xl font-bold text-center text-brazil-blue mb-12">
          {t("contact.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-brazil-green" />
              <p className="text-gray-700">+33 1 23 45 67 89</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-brazil-green" />
              <p className="text-gray-700">contact@valeriocarlosparis.com</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-brazil-green" />
              <p className="text-gray-700">Paris, France</p>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="w-6 h-6 text-brazil-green" />
              <p className="text-gray-700">@chefvaleriocarlos</p>
            </div>
          </div>
          <form className="space-y-6">
            <input
              type="text"
              placeholder={t("contact.form.name")}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazil-green/50"
            />
            <input
              type="email"
              placeholder={t("contact.form.email")}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazil-green/50"
            />
            <textarea
              placeholder={t("contact.form.message")}
              rows={4}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brazil-green/50"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-brazil-green text-white py-4 px-6 rounded-xl hover:bg-brazil-green/90 transition-colors font-medium"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brazil-blue text-white py-8 px-4 text-center">
        <p className="font-light">
          &copy; {new Date().getFullYear()} Chef Valerio Carlos. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

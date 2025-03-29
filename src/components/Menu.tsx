import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import { UtensilsCrossed } from "lucide-react";

interface MenuItem {
  id: string;
  menu_category_id: string;
  price: number;
  image_url?: string;
  translations: {
    name: string;
    description: string;
  };
}

interface Category {
  id: string;
  translations: {
    name: string;
  };
  items: MenuItem[];
}

export function Menu() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("menu_categories")
          .select(
            `
            id,
            menu_category_translations!inner (
              name
            ),
            menu_items (
              id,
              price,
              image_url,
              menu_item_translations!inner (
                name,
                description
              )
            )
          `
          )
          .eq("menu_category_translations.language", i18n.language);

        if (categoriesError) throw categoriesError;

        const formattedCategories =
          categoriesData?.map((category) => ({
            id: category.id,
            translations: {
              name: category.menu_category_translations[0].name,
            },
            items: category.menu_items.map(
              (item: {
                id: string;
                price: number;
                image_url?: string;
                menu_item_translations: Array<{
                  name: string;
                  description: string;
                }>;
              }) => ({
                id: item.id,
                menu_category_id: category.id,
                price: item.price,
                image_url: item.image_url,
                translations: {
                  name: item.menu_item_translations[0].name,
                  description: item.menu_item_translations[0].description,
                },
              })
            ),
          })) || [];

        setCategories(formattedCategories);

        // Set first category as active by default
        if (formattedCategories.length > 0 && !activeTab) {
          setActiveTab(formattedCategories[0].id);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [i18n.language, activeTab]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brazil-green"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="bg-white py-20 px-4 md:px-8" id="menu">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <UtensilsCrossed className="w-8 h-8 text-brazil-green" />
            <h2 className="font-display text-4xl font-bold text-brazil-blue">
              {t("menu.title")}
            </h2>
            <UtensilsCrossed className="w-8 h-8 text-brazil-green" />
          </div>
          <p className="text-gray-600">Menu items will be available soon.</p>
        </div>
      </section>
    );
  }

  // Find active category
  const activeCategory =
    categories.find((category) => category.id === activeTab) || categories[0];

  return (
    <section className="bg-white py-20 px-4 md:px-8" id="menu">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <UtensilsCrossed className="w-8 h-8 text-brazil-green" />
          <h2 className="font-display text-4xl font-bold text-brazil-blue">
            {t("menu.title")}
          </h2>
          <UtensilsCrossed className="w-8 h-8 text-brazil-green" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeTab === category.id
                  ? "bg-brazil-green text-white shadow-md"
                  : "bg-white text-brazil-blue border border-brazil-green/30 hover:bg-brazil-green/10"
              }`}
            >
              {category.translations.name}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          {activeCategory && (
            <div className="space-y-6">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="group hover:bg-coconut p-4 rounded-xl transition-colors duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    {item.image_url && (
                      <div className="flex-shrink-0">
                        <div
                          className="w-20 h-20 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                          onClick={() => setSelectedImage(item.image_url)}
                        >
                          <img
                            src={item.image_url}
                            alt={item.translations.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className={`flex-grow ${!item.image_url ? "ml-0" : ""}`}
                    >
                      <h4 className="font-medium text-lg text-brazil-blue group-hover:text-brazil-green transition-colors">
                        {item.translations.name}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {item.translations.description}
                      </p>
                    </div>
                    <span className="text-brazil-green font-medium text-lg flex-shrink-0">
                      €{item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Menu item"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brazil-blue"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

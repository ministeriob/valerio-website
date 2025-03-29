import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'pt', name: 'Português' }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative group">
        <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:bg-white transition-colors">
          <Globe className="w-5 h-5 text-brazil-green" />
          <span className="text-brazil-blue">
            {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
          </span>
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`block w-full text-left px-4 py-3 hover:bg-coconut first:rounded-t-xl last:rounded-b-xl transition-colors ${
                i18n.language === lang.code ? 'bg-brazil-green/10 text-brazil-green' : 'text-gray-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
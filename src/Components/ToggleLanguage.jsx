import { useTranslation } from 'react-i18next';

export default function ToggleLanguage({ }) {
    const { t, i18n } = useTranslation();

    // A simple function to flip between English and Georgian
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ka' : 'en';
        i18n.changeLanguage(newLang);
    };
    return (
        <button 
            onClick={toggleLanguage}
            className="mb-4 px-4 py-2 bg-luxury-button text-white rounded hover:bg-luxury-button-hovered transition cursor-pointer"
        >
            {t('switch_lang')}
        </button>
    )
}
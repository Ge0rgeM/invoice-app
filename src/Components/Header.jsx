import logo from '@/assets/Logo.png';
import { useTranslation } from "react-i18next";

export default function Header({ headerRef }) {
    const { t } = useTranslation();
    const invoiceDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    return (        
        <div 
          ref={headerRef} 
          className="grid grid-cols-3 items-center px-12 pt-12 pb-6 border-b border-gray-200 bg-white"
        >
          {/* Left: Invoice Details */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-gray-900">{t("invoice")}</h1>
            <p className="text-sm text-gray-500 mt-2">{t("invoice_number")}: INV-2026-001</p>
            <p className="text-sm text-gray-500">{t("date")}: {invoiceDate}</p>
          </div>
          
          {/* Center: The Logo */}
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="w-100% object-contain" 
            />
          </div>
          
          {/* Right: Company Details */}
          <div className="flex flex-col items-end text-right">
            <h2 className="text-4xl font-bold text-gray-900 font-playfair">{t("rosaluna_llc")}</h2>
            <p className="text-sm text-gray-600 mt-2">{t("georgia")}</p>
            <p className="text-sm text-gray-600">{t("tbilisi")}</p>
          </div>
        </div>
    )
}
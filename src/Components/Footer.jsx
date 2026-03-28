import { useTranslation } from "react-i18next";

export default function Footer({ footerRef }) {
  const { t } = useTranslation();
    return (        
        <div ref={footerRef} className="h-45 px-12 pt-6 pb-12 bg-white border-t border-gray-200 mt-auto">
          <h3 className="text-gray-800 font-bold mb-3">{t("payment_instructions")}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="mb-1"><span className="font-semibold text-gray-800">{t("bank_name")}:</span> {t("bank_of_Georgia")}</p>
              <p className="mb-1"><span className="font-semibold text-gray-800">{t("account_name")}:</span> {t("rosaluna_llc")}</p>
            </div>
            <div>
              <p className="mb-1"><span className="font-semibold text-gray-800">{t("account_number")}</span> GE00BG0000000000000000</p>
              <p className="mb-1"><span className="font-semibold text-gray-800">{t("swift")}:</span> BAGAGE22</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-400 text-center italic">
            {t("thank_you")}
          </p>
        </div>
    )
}
import { useTranslation } from "react-i18next";
import { formatNumber } from '@/utils/formatNumber.js';

export default function AutoCalculate({ items }) {
    const { t } = useTranslation();
    // Auto-calculate totals
    const grandTotal = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(String(item.price).replace(/,/g, ''))), 0); //Already Taxed
    const taxRate = 0.18; // 18% tax
    const netAmount = grandTotal / (1 + taxRate); // Calculate net amount before tax
    const taxAmount = netAmount * taxRate; // Calculate tax amount based on subtotal
    
    return (
        <div className="flex justify-end mb-12 totals-container">
          <div className="w-1/2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">{t("net_amount")}</span>
              <span>{formatNumber(netAmount)} ₾</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">{t("tax_18")}</span>
              <span>{formatNumber(taxAmount)} ₾</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">{t("subtotal")}</span>
              <span>{formatNumber(grandTotal)} ₾</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold">
              <span>{t("total_due")}</span>
              <span>{formatNumber(grandTotal)} ₾</span>
            </div>
          </div>
        </div>
    )
}
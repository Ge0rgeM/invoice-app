import { useTranslation } from "react-i18next";
import { formatNumber } from '@/utils/formatNumber.js';
import { useMemo } from 'react';

export default function InvoicesList({ invoices, onSelectInvoice, searchTerm, setSearchTerm }) {
    const { t } = useTranslation();

    // Filter invoices based on search term
    const filteredInvoices = useMemo(() => {
        if (!searchTerm.trim()) {
            return invoices;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return invoices.filter((invoice) => {
            const invoiceNumber = (invoice.invoice_number || '').toLowerCase();
            const clientName = (invoice.client_firstname || '').toLowerCase();
            const clientEmail = (invoice.client_email || '').toLowerCase();
            const invoiceDate = (invoice.invoice_date || '').toLowerCase();

            return (
                invoiceNumber.includes(lowerSearchTerm) ||
                clientName.includes(lowerSearchTerm) ||
                clientEmail.includes(lowerSearchTerm) ||
                invoiceDate.includes(lowerSearchTerm)
            );
        });
    }, [invoices, searchTerm]);

    if (!invoices || invoices.length === 0) {
        return (
            <div className="w-full max-w-4xl text-center py-12 px-4">
                <p className="text-gray-300 text-lg">{t("no_invoices_found")}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    {t("invoices")} ({filteredInvoices.length} {t("of")} {invoices.length})
                </h2>
                <div className="h-1 w-24 bg-luxury-button rounded mb-6"></div>

                {/* Search Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t("load_invoice") || "Search by invoice number, client, email or date..."}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-button focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
                />
            </div>

            {/* No results message */}
            {filteredInvoices.length === 0 && searchTerm.trim() !== '' && (
                <div className="w-full text-center py-8 px-4">
                    <p className="text-gray-300 text-lg">{t("no_invoices_found")}</p>
                </div>
            )}

            {/* Invoices Table */}
            {filteredInvoices.length > 0 && (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="w-full bg-white">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="px-6 py-4 text-left font-semibold">{t("invoice_number")}</th>
                                <th className="px-6 py-4 text-left font-semibold">{t("client_name")}</th>
                                <th className="px-6 py-4 text-left font-semibold">{t("date")}</th>
                                <th className="px-6 py-4 text-right font-semibold">{t("total")}</th>
                                <th className="px-6 py-4 text-center font-semibold">{t("generic.delete")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice, index) => {
                                const items = JSON.parse(invoice.full_invoice_data || '[]');
                                const total = formatNumber(invoice.total_amount || 0);

                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            {invoice.invoice_number}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {invoice.client_firstname}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {new Date(invoice.invoice_date).toLocaleDateString(
                                                navigator.language,
                                                { year: 'numeric', month: 'short', day: 'numeric' }
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-800 font-semibold">
                                            {total > 0 ? (
                                                <span className="text-red-500 text-sm">{total} ₾</span>
                                            ) : (
                                                <span className="text-green-500 text-sm">{total} ₾</span>
                                            ) }
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => onSelectInvoice && onSelectInvoice(invoice)}
                                                className="px-4 py-2 bg-luxury-button text-white rounded hover:bg-luxury-button-hovered transition-colors font-semibold text-sm cursor-pointer"
                                            >
                                                {t("generic.delete")}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

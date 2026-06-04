import { formatNumber } from '@/utils/formatNumber.js';
import { useMemo, useState, useEffect } from 'react';

export default function InvoicesList({ 
    invoices, 
    setInvoices,
    onDeleteInvoice, 
    onRecoverInvoice,
    searchTerm, 
    setSearchTerm,
    setLoading,
    setLoadingText,
    setErrorMessage,
    activeTab,
    setActiveTab,
    t
}) {
    const [result, setResult] = useState(null); // Add state to track the result of delete operation
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
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

    const totalFiltered = filteredInvoices.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

    useEffect(() => {
        // Reset to page 1 when filters change or page size changes
        setCurrentPage((prev) => (prev > totalPages ? 1 : prev));
    }, [totalFiltered, pageSize, totalPages]);

    const paginatedInvoices = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredInvoices.slice(start, start + pageSize);
    }, [filteredInvoices, currentPage, pageSize]);
    return (
        <div className="w-full max-w-4xl">  
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                    {t("invoices")} ({Math.min(((currentPage-1)*pageSize)+1, totalFiltered)}-{Math.min(currentPage*pageSize, totalFiltered)} {t("of")} {totalFiltered})
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

            {/* Invoices Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <div className="bg-gray-700 text-white w-full flex justify-between">
                    <div
                        className={`w-1/2 cursor-pointer text-center p-2 font-semibold rounded-tr-lg transition duration-300 ${activeTab === 'active' ? 'bg-gray-800 text-white' : 'hover:bg-gray-600 '}`}
                        onClick={() => setActiveTab('active')}
                    >
                        Active
                    </div>
                    <div
                        className={`w-1/2 cursor-pointer text-center p-2 font-semibold rounded-tl-lg transition duration-300 ${activeTab === 'deleted' ? 'bg-gray-800 text-white' : 'hover:bg-gray-600'}`}
                        onClick={() => setActiveTab('deleted')}
                    >
                        Deleted
                    </div>
                </div>
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
                        {paginatedInvoices.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    {t("no_invoices_found")}
                                </td>
                            </tr>
                        ) : (
                            paginatedInvoices.map((invoice, index) => {
                                const items = JSON.parse(invoice.full_invoice_data || '[]');
                                const totalFormatted = formatNumber(invoice.total_amount || 0);
                                console.log(totalFormatted, typeof totalFormatted);

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
                                        {invoice.total_amount > 0 ? (
                                            <span className="text-red-500 text-sm">{totalFormatted} ₾</span>
                                        ) : (
                                            <span className="text-green-500 text-sm">{totalFormatted} ₾</span>
                                        ) }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {activeTab === 'active'?(
                                            <button
                                                onClick={async () => {
                                                    const deleteResult = await onDeleteInvoice(
                                                        invoice.invoice_number, 
                                                        setLoading, 
                                                        setLoadingText, 
                                                        setErrorMessage
                                                    );
                                                    console.log("Delete result: ", deleteResult);
                                                    setResult(deleteResult);
                                                    deleteResult === "success" ? setInvoices(prev => prev.filter(inv => inv.invoice_number !== invoice.invoice_number)) : null;
                                                }}
                                                className="px-4 py-2 bg-luxury-button text-white rounded hover:bg-luxury-button-hovered transition-colors font-semibold text-sm cursor-pointer"
                                            >
                                                {t("generic.delete")}
                                            </button>
                                        ):(
                                            <button
                                                onClick={async () => {
                                                    const recoverResult = await onRecoverInvoice(
                                                        invoice.invoice_number, 
                                                        setLoading, 
                                                        setLoadingText, 
                                                        setErrorMessage
                                                    );
                                                    console.log("Recover result: ", recoverResult);
                                                    setResult(recoverResult);
                                                    recoverResult === "success" ? setInvoices(prev => prev.filter(inv => inv.invoice_number !== invoice.invoice_number)) : null;
                                                }}
                                                className="px-4 py-2 bg-luxury-button text-white rounded hover:bg-luxury-button-hovered transition-colors font-semibold text-sm cursor-pointer"
                                            >
                                                {t("generic.recover")}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-300">
                    {t("showing")} {totalFiltered === 0 ? 0 : ((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalFiltered)} {t("of")} {totalFiltered}
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={pageSize}
                        onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                        className="px-2 py-1 rounded bg-white text-gray-800"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>

                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-700'}`}
                    >
                        {t("prev")}
                    </button>

                    <div className="text-sm text-white px-2">{currentPage} / {totalPages}</div>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-700'}`}    
                    >
                        {t("next")}
                    </button>
                </div>
            </div>
        </div>
    );
}

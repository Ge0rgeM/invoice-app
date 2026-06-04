import { fetchAllInvoices } from '@/ApiRequests/fetchAllInvoices';
// import { handleSelectInvoice } from '@/ApiRequests/handleSelectInvoice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingWindow from '@/Components/LoadingWindow';
import InvoicesList from '@/Components/InvoicesList';
import ErrorWindow from '@/Components/ErrorWindow';
import { useTranslation } from "react-i18next";
import handleDeleteInvoiceClick from '@/ApiRequests/moveInvoiceToDeleteTable.js';

export default function Database() {
    const { t } = useTranslation(); 
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(t("generic.loading"));
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadInvoices = async () => {
            try {
                const allInvoices = await fetchAllInvoices(setLoading);
                setInvoices(allInvoices);
            } catch (error) {
                setErrorMessage(error.message || "Failed to load invoices");
            }
        };

        loadInvoices();
    }, [t]);

    return (
        <div className="w-full min-h-screen bg-luxury-brown flex flex-col items-center py-8">
            {loading && <LoadingWindow text={loadingText} />}
            <ErrorWindow 
                message={errorMessage} 
                onClose={() => setErrorMessage('')}
                t={t}
            />
            <InvoicesList 
                invoices={invoices}
                setInvoices={setInvoices}
                onSelectInvoice={handleDeleteInvoiceClick}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setLoading={setLoading}
                setLoadingText={setLoadingText}
                setErrorMessage={setErrorMessage}
                t={t}
            />
        </div>
    );  
}

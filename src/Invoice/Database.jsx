import { fetchAllInvoices } from '@/ApiRequests/fetchAllInvoices';
import { fetchAllDeletedInvoices } from '@/ApiRequests/fetchAllDeletedInvoices';
// import { handleSelectInvoice } from '@/ApiRequests/handleSelectInvoice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingWindow from '@/Components/LoadingWindow';
import InvoicesList from '@/Components/InvoicesList';
import ErrorWindow from '@/Components/ErrorWindow';
import { useTranslation } from "react-i18next";
import handleDeleteInvoiceClick from '@/ApiRequests/moveInvoiceToDeleteTable.js';
import handleRecoverInvoiceClick from '@/ApiRequests/recoverInvoice.js';

export default function Database() {
    const { t } = useTranslation(); 
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(t("generic.loading"));
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('active'); // Add state for active tab

    useEffect(() => {
        const loadInvoices = async () => {
            setLoadingText(t("generic.loading"));
            try {
                let allInvoices;
                activeTab==="active" ? allInvoices = await fetchAllInvoices(setLoading) : allInvoices = await fetchAllDeletedInvoices(setLoading);
                setInvoices(allInvoices);
                setLoadingText('');
            } catch (error) {
                setErrorMessage(error.message || "Failed to load invoices");
                setLoadingText('');
            }
        };

        loadInvoices();
    }, [t, activeTab]);

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
                onDeleteInvoice={handleDeleteInvoiceClick}
                onRecoverInvoice={handleRecoverInvoiceClick}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setLoading={setLoading}
                setLoadingText={setLoadingText}
                setErrorMessage={setErrorMessage}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                t={t}
            />
        </div>
    );  
}

import { handleSaveClick } from '@/utils/handleSaveClick.js';
export default function SaveInvoice({ 
    client, 
    items, 
    setInvoiceList, 
    setInitialClient, 
    setInitialItems, 
    setErrorMessage, 
    setLoadingWindow, 
    setLoadingText, 
    t 
}) {
    return (
        <button 
            onClick ={() => { handleSaveClick(
                                client, 
                                items, 
                                setInitialClient, 
                                setInitialItems, 
                                setInvoiceList, 
                                setErrorMessage, 
                                setLoadingWindow, 
                                setLoadingText,
                                t
                            ) }}
            className="mb-6 px-6 py-2 bg-luxury-button text-white font-semibold rounded shadow hover:bg-luxury-button-hovered transition-colors cursor-pointer"
        >
            {t("save")}
        </button>
    )
}
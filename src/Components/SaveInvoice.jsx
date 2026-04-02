import { handleSaveClick } from '@/utils/handleSaveClick.js';
export default function SaveInvoice({ client, items, setInvoiceList, setInitialClient, setInitialItems }) {
    return (
        <button 
            onClick ={() => { handleSaveClick(client, items, setInitialClient, setInitialItems, setInvoiceList) }}
            className="mb-6 px-6 py-2 bg-luxury-button text-white font-semibold rounded shadow hover:bg-luxury-button-hovered transition-colors cursor-pointer"
        >
            Save
        </button>
    )
}
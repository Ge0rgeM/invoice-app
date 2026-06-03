import { useNavigate } from 'react-router-dom';
import { handleSaveClick } from '@/utils/handleSaveClick.js';
import { handleSelectInvoice } from '@/ApiRequests/handleSelectInvoice.js';

export function SavingWindow({ 
    setShowSaveModal, 
    client, 
    items, 
    setInitialClient, 
    setInitialItems, 
    setInvoiceList, 
    onLoadInvoice, 
    setSearchTerm, 
    setIsDropdownOpen, 
    setLoading, 
    setLoadingText,
    setErrorMessage, 
    pendingInvoiceToLoad, 
    setPendingInvoiceToLoad,
    pendingNavigation,
    setPendingNavigation,
    t
 }) {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full border border-gray-200 transform transition-all">
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unsaved Changes</h3>
            <p className="text-gray-600 mb-6">
                You have edited this invoice. Do you want to save your changes before leaving?
            </p>
            
            {/* The 3 Choices */}
            <div className="flex justify-end space-x-3">
                
                {/* Choice 1: Cancel (Stay on the page) */}
                <button 
                    onClick={() => {
                        setShowSaveModal(false);
                        setPendingNavigation(null);
                        setPendingInvoiceToLoad(null);
                    }} 
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                Cancel
                </button>
                
                {/* Choice 2: Discard (Lose changes and leave) */}
                <button 
                    onClick={() => {
                        setShowSaveModal(false);
                        if (pendingInvoiceToLoad) {
                            handleSelectInvoice(
                                pendingInvoiceToLoad, 
                                setSearchTerm, 
                                setIsDropdownOpen, 
                                setLoading, 
                                setErrorMessage, 
                                onLoadInvoice
                            );
                            setPendingInvoiceToLoad(null);
                        } else if (pendingNavigation) {
                            navigate(pendingNavigation);
                            setPendingNavigation(null);
                        }
                    }} 
                    className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors"
                    >
                    Discard
                </button>

                {/* Choice 3: Save (Run your save function, then leave) */}
                <button 
                    onClick={async () => {
                        const saveResult = await handleSaveClick(
                            client, 
                            items, 
                            setInitialClient, 
                            setInitialItems, 
                            setInvoiceList,
                            setErrorMessage,
                            setLoading,
                            setLoadingText,
                            t
                        );
                        setShowSaveModal(false);
                        if (saveResult !== "error") {
                            if (pendingInvoiceToLoad) {
                                handleSelectInvoice(
                                    pendingInvoiceToLoad, 
                                    setSearchTerm, 
                                    setIsDropdownOpen, 
                                    setLoading, 
                                    setErrorMessage, 
                                    onLoadInvoice
                                );
                                setPendingInvoiceToLoad(null); // Clear the memory
                            } else if (pendingNavigation) {
                                navigate(pendingNavigation);
                                setPendingNavigation(null);
                            }
                        }
                    }} 
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium shadow-sm transition-colors"
                    >
                    Save & Close
                </button>
            </div>
            </div>
        </div>
    );
}
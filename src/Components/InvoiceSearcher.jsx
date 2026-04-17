import { useState, useEffect, useRef } from 'react';
import LoadingWindow from '@/Components/LoadingWindow';
import { formatNumber } from '@/utils/formatNumber.js';
import { fetchAllInvoices } from '@/ApiRequests/fetchAllInvoices';
import { handleSelectInvoice } from '@/ApiRequests/handleSelectInvoice.js';

export default function InvoiceSearcher({ 
  setPendingInvoiceToLoad, 
  searchTerm, setSearchTerm, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  loading, 
  setLoading, 
  setErrorMessage, 
  setError, 
  onLoadInvoice, 
  setShowSaveModal, 
  isDirty, 
  invoiceList, 
  setInvoiceList, 
  t
  }) {  
  const dropdownRef = useRef(null);
  
  // Listen for clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown exists on screen AND the thing we clicked is NOT inside it...
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the menu!
      }
    };
    // Attach the listener to the whole webpage
    document.addEventListener("mousedown", handleClickOutside);
    // CLEANUP: React removes this listener when you navigate away from the page
    // This prevents massive memory leaks in your app!
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 1. Fetch the lightweight list of all invoices when the page loads
  useEffect(() => {
      fetchAllInvoices(setLoading)
        .then((actualInvoices) => {
          // Safely set the list if data was returned
          if (actualInvoices) {
            setInvoiceList(actualInvoices);
          }
        })
        .catch((error) => {
          console.error("Error fetching invoices:", error.message);
          setErrorMessage(t(`errors.${error.message}`));
        });
    }, []);

  // 2. Filter the list based on what the user types
  const filteredInvoices = invoiceList.filter(inv => 
    inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (inv.client_firstname && inv.client_firstname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-luxury-button shadow-md rounded-lg mb-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-white flex justify-center">Edit Existing Invoice</h3>
      
      {/* Container must be relative so the absolute dropdown attaches to it */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search by Invoice # or Client Name..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true); // Open dropdown when typing
            }}
            onFocus={() => setIsDropdownOpen(true)} // Open dropdown when clicked
            className="cursor-pointer border border-gray-300 p-3 rounded-md w-full hover:bg-luxury-button-hovered focus:ring-2 focus:ring-blue-500 outline-none transition-all text-luxury-brown font-bold"
          />
        </div>

        {/* The Custom Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <div 
                  key={inv.invoice_number}
                  onClick={() => {
                    const nextInvoice = inv.invoice_number;
                    if (isDirty) {
                      // 1. Intercept! Remember where they wanted to go, but don't go there yet.
                      setPendingInvoiceToLoad(nextInvoice);
                      // 2. Show the modal
                      setShowSaveModal(true);
                    } else {
                      // It's clean, so just load it immediately!
                      handleSelectInvoice(nextInvoice, setSearchTerm, setIsDropdownOpen, setLoading, setErrorMessage, onLoadInvoice);
                    }
                  }}
                  className="p-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 w-full flex "
                >
                  <div className='w-[64%]'>
                    <span className="font-bold text-gray-800">{inv.invoice_number}</span>
                    <span className="text-gray-500 text-sm ml-2">{inv.client_firstname || 'Unknown Client'}</span>
                  </div>
                  <div className='w-[18%] flex flex-col justify-center items-end pr-3'>
                    {inv.total_amount > 0 ? (
                        <span className="text-red-500 text-sm">{formatNumber(inv.total_amount)} ₾</span>
                      ) : (
                        <span className="text-green-500 text-sm">{formatNumber(inv.total_amount)} ₾</span>
                      ) }
                  </div>
                  <div className='w-[18%]'>
                    <span className="text-gray-400 text-sm">{inv.invoice_date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-center italic">No invoices found.</div>
            )}
          </div>
        )}
      </div>
      {/* {loading && <LoadingWindow text="Fetching data from server..." />}
      {error && <p className="text-red-500 mt-3 text-sm font-medium">{error}</p>} */}
    </div>
  );
}
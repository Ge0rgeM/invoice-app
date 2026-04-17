import logo from '@/assets/Logo.png';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { checkInvoiceNumber } from '@/ApiRequests/checkInvoiceNumber.js';

export default function Header({ headerRef, client, setClient, editing }) {
    const { t } = useTranslation();
    const [invoiceNumber, setInvoiceNumber] = useState(client.invoice_number); // Default prefix for invoice numbers

    return (        
        <div 
          ref={headerRef} 
          className="grid grid-cols-3 items-center px-12 pt-12 pb-6 border-b border-gray-200 bg-white text-nowrap"
        >
          {/* Left: Invoice Details */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold text-gray-900">{t("invoice")}</h1>
            <div className="flex flex-row items-center">
              <p className="text-sm text-gray-500 whitespace-nowrap">{t("invoice_number")}&nbsp;</p>
              {/* {!editing ? (
                              <input
                type="text"
                name="invoice_number"
                // 1. If the state is empty, force it to show the prefix to start
                value={invoiceNumber || "ROS-2026-"} 
                
                onChange={(e) => {
                  const rawValue = e.target.value;
                  // 2. Temporarily remove the prefix to isolate what the user just typed
                  const userPart = rawValue.replace("ROS-2026-", "");
                  // 3. Strip out any letters/symbols and limit it to strictly 3 numbers
                  const onlyNumbers = userPart.replace(/\D/g, '').slice(0, 3);
                  // 4. Glue the invincible prefix back onto their numbers!
                  const finalInvoiceString = `ROS-2026-${String(onlyNumbers)}`;
                  if (checkInvoiceNumber(finalInvoiceString)) { // Check if the invoice number is unique
                    setInvoiceNumber(finalInvoiceString);
                    setClient(prev => ({ ...prev, invoice_number: finalInvoiceString })); // Update parent state with invoice number
                  } else {
                    alert("This invoice number is already taken. Please choose a different one.");
                  }
                }}
                
                onBlur={() => {
                  // 5. When they click away, ensure it pads to 3 digits (e.g., '1' becomes '001')
                  const currentNumbers = (invoiceNumber || "").replace("ROS-2026-", "");
                  if (currentNumbers.length > 0) {
                    const padded = currentNumbers.padStart(3, "0");
                    const finalInvoiceString = `ROS-2026-${padded}`;
                    if (checkInvoiceNumber(finalInvoiceString)) { // Check if the invoice number is unique
                      setInvoiceNumber(finalInvoiceString);
                      setClient(prev => ({ ...prev, invoice_number: finalInvoiceString })); // Update parent state with invoice number
                    } else {
                      alert("This invoice number is already taken. Please choose a different one.");
                    }
                  }
                }}
                
                placeholder={invoiceNumber}
                className="
                  cursor-pointer text-sm text-gray-500 w-1/2 px-1 py-0.5
                  bg-transparent border border-transparent hover:border-gray-200 
                  focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 
                  rounded transition-all outline-none
                "
              />
              ):(
                <p className="text-sm text-gray-500 px-1 py-0.5">{client.invoice_number}</p>
                )} */}
              <p className="text-sm text-gray-500 px-1 py-0.5">{client.invoice_number}</p>
            </div>
            <p className="text-sm text-gray-500">{t("date")}: {client.invoice_date}</p>
          </div>
          
          {/* Center: The Logo */}
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="w-full object-contain" 
            />
          </div>
          
          {/* Right: Company Details */}
          <div className="flex flex-col items-end text-right">
            <h2 className="text-4xl font-bold text-gray-900 font-playfair">{t("rosaluna_llc")}</h2>
            <p className="text-sm text-gray-600 mt-2">{t("georgia")}</p>
            <p className="text-sm text-gray-600">{t("tbilisi")}</p>
          </div>
        </div>
    )
}
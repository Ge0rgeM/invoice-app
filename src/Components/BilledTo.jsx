import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BilledTo({setClient, client}) {
    const { t } = useTranslation();
    const handleClientChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };
    return (
        <>
        {/* Billed To */}
        <div className="mb-8 flex flex-col items-start w-full">
          <h3 className="text-gray-600 font-semibold mb-2">{t("billed_to")}</h3>
          
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleClientChange}
            placeholder={t("client_name_placeholder")}
            className="w-full font-bold text-gray-900 bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded px-2 py-1  transition-all outline-none"
          />
          
          <textarea
            name="address"
            value={client.address}
            onChange={handleClientChange}
            placeholder={t("client_address_placeholder")}
            rows={1}
            className="w-full text-sm text-gray-600 bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded px-2 py-1  mt-1 transition-all outline-none resize-none overflow-hidden"
          />
          
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleClientChange}
            placeholder={t("client_email_placeholder")}
            className="w-full text-sm text-gray-600 bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded px-2 py-1  mt-1 transition-all outline-none"
          />
        </div>
        </>
    )
}
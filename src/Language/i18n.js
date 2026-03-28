import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
        "switch_lang": "KA", // Text for the button to switch TO Georgian
        //General translations
        "georgia": "Georgia",
        "tbilisi": "Tbilisi",
        //DownloadInvoice translations
        "download_pdf": "Download PDF",
        "client_name": "Client", // Placeholder text for client name input
        //Header translations
        "invoice": "Invoice",
        "invoice_number": "Invoice Number",
        "date": "Date",
        //BilledTo translations
        "billed_to": "Billed To:",
        "client_name_placeholder": "Client Name...", // Placeholder text for client name input
        "client_address_placeholder": "Client Address...", // Placeholder text for client address textarea
        "client_email_placeholder": "Client Email...", // Placeholder text for client email input
        //ItemTable translations
        "item_description": "Item Description",
        "quantity": "Quantity",
        "price": "Price",
        "total": "Total Due",
        "add_line_item": "+ Add Line Item", // Text for the button to add a new line item
        "item_description_placeholder": "Item Description...", // Placeholder text for item description input
        //AutoCalculate translations
        "net_amount": "Net Amount",
        "tax_18": "VAT (18%)",
        "subtotal": "Subtotal",
        "total_due": "Total Due",
        //Footer translations
        "payment_instructions": "Payment Instructions", 
        "bank_name": "Bank Name",
        "bank_of_Georgia": "Bank of Georgia",
        "account_name": "Account Name",
        "rosaluna_llc": "Rosaluna LLC",
        "account_number": "Account Number",
        "swift": "SWIFT",
        "thank_you": "Thank you for your business!"
    }
  },
  ka: {
    translation: {
        "switch_lang": "EN", // Text for the button to switch TO English
        //General translations
        "georgia": "საქართველო",
        "tbilisi": "თბილისი",
        //DownloadInvoice translations
        "download_pdf": "PDF-ის ჩამოტვირთვა",
        "client_name": "მყიდველი", // Placeholder text for client name input
        //Header translations
        "invoice": "ინვოისი",
        "invoice_number": "ინვოისის ნომერი",
        "date": "თარიღი",
        //BilledTo translations
        "billed_to": "მყიდველი:",
        "client_name_placeholder": "მყიდველის სახელი...", // Placeholder text for client name input
        "client_address_placeholder": "მყიდველის მისამართი...", // Placeholder text for client address textarea
        "client_email_placeholder": "მყიდველის ელ.ფოსტა...", // Placeholder text for client email input
        //ItemTable translations
        "item_description": "ნივთის აღწერა",
        "quantity": "რაოდენობა",
        "price": "ფასი",
        "total": "ჯამი",
        "add_line_item": "+ დამატება", // Text for the button to add a new line item
        "item_description_placeholder": "ნივთის აღწერა...", // Placeholder text for item description input
        //AutoCalculate translations
        "net_amount": "ღირებულება (Net)",
        "tax_18": "დღგ (18%)",
        "subtotal": "ჯამი",
        "total_due": "სულ გადასახდელი",
        //Footer translations
        "payment_instructions": "საგადახდო რეკვიზიტები",
        "bank_name": "ბანკის სახელი",
        "bank_of_Georgia": "საქართველოს ბანკი",
        "account_name": "მიმღების სახელი",
        "rosaluna_llc": "Rosaluna LLC",
        "account_number": "ანგარიშის ნომერი",
        "swift": "SWIFT",
        "thank_you": "გმადლობთ თანამშრომლობისთვის!"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ka", // The default language when the app loads
    fallbackLng: "en", // Fallback language if a translation is missing
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
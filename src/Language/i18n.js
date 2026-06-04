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
        "downloading...": "Downloading...",
        "client_name": "Client", // Placeholder text for client name input
        //Header translations
        "invoice": "Invoice",
        "invoice_number": "Invoice Number:",
        "default_invoice_number": "ROS-2026-XXX", // Default value for invoice number input
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
        "thank_you": "Thank you for your business!",
        //Error messages and other translations
        "something_went_wrong": "Something went wrong! Try again later."

    }
  },
  ka: {
    translation: {
      "switch_lang": "EN", // Text for the button to switch TO English
      //General translations
      "generic": {
        "georgia": "საქართველო",
        "tbilisi": "თბილისი",
        "close": "დახურვა",
        "save": "შენახვა",
        "saving": "მიმდინარეობს შენახვა...",
        "loading": "მიმდინარეობს ჩატვირთვა...",
        "page_refresh": "გადატვირთვა",
        "delete": "წაშლა",
        "recover": "აღდგენა",
      },
      // Page Navigations
      "create_invoice": "ინვოისის შექმნა",
      "load_invoice": "ინვოისის არჩევა",
      "load_database": "ინვოისების ბაზა",
      //DownloadInvoice translations
      "download_pdf": "PDF-ის ჩამოტვირთვა",
      "downloading...": "ჩამოტვირთვა...",
      "client_name": "მყიდველი", // Placeholder text for client name input
      //Header translations
      "invoice": "ინვოისი",
      "invoice_number": "ინვოისის ნომერი:",
      "default_invoice_number": "ROS-2026-XXX", // Default value for invoice number input
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
      "calculations" : {
        "net_amount": "ღირებულება (Net)",
        "tax_18": "დღგ (18%)",
        "subtotal": "ჯამი",
        "total_due": "სულ გადასახდელი",
      },
      //Footer translations
      "payment_instructions": "საგადახდო რეკვიზიტები",
      "bank_name": "ბანკის სახელი",
      "bank_of_Georgia": "საქართველოს ბანკი",
      "account_name": "მიმღების სახელი",
      "rosaluna_llc": "Rosaluna LLC",
      "account_number": "ანგარიშის ნომერი",
      "swift": "SWIFT",
      "thank_you": "გმადლობთ თანამშრომლობისთვის!",
      //Error messages and other translations
      "fetching_next_invoice_number": "მიმდინარეობს ინვოისის ნომრის გენერირება...",
      "errors": {
        "failed_to_fetch": "სერვერთან დაკავშირება ვერ მოხერხდა. გთხოვთ, შეამოწმეთ ინტერნეტ კავშირი ან სცადეთ მოგვიანებით.",
        "something_went_wrong": "დაფიქსირდა შეცდომა! გთხოვთ სცადეთ მოგვიანებით.",
        "failed_to_connect_db": "სერვერთან დაკავშირება ვერ მოხერხდა. გთხოვთ, სცადეთ მოგვიანებით.",
        "db_error": "სერვერის პრობლემა. გთხოვთ, სცადეთ მოგვიანებით.",
        "failed_to_generate_invoice_number": "ინვოისის ნომრის გენერირება ვერ მოხერხდა. გთხოვთ, სცადეთ მოგვიანებით.",
        "error": "შეცდომა!",
        "missing_invoice_number": "ინვოისის ნომერი არ არის მითითებული. გთხოვთ, შეიყვანეთ ინვოისის ნომერი.",
        "failed_to_fetch_invoices": "ინვოისების ჩამოტვირთვა ვერ მოხერხდა. გთხოვთ, სცადეთ მოგვიანებით.",
        "invoice_not_found": "ინვოისი ვერ მოიძებნა. გთხოვთ, შეამოწმეთ ინვოისის ნომერი და სცადეთ ისევ.",
        "invalid_invoice_number": "ინვოისის ნომერი არასწორია. გთხოვთ, შეიყვანეთ სწორი ფორმატის ინვოისის ნომერი (ROS-2026-XXX)."
      }
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
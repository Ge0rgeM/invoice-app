import { useTranslation } from "react-i18next";

export default function ItemTable({ items, setItems }) {
    const { t } = useTranslation();
    //Add a new empty row
    const handleAddItem = () => {
      setItems([...items, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
    };

    //Update a specific field in a specific row
    const handleItemChange = (id, field, value) => {
      setItems(items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };

    //Remove a row
    const handleRemoveItem = (id) => {
      setItems(items.filter(item => item.id !== id));
    };
    return (
        <>
        <table className="w-full text-left border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b border-gray-400">
              <th className="p-3 font-semibold w-1/2">{t("item_description")}</th>
              <th className="p-3 font-semibold text-center w-1/6">{t("quantity")}</th>
              <th className="p-3 font-semibold w-1/6 text-center">{t("price")}</th>
              <th className="p-3 font-semibold text-right w-1/6">{t("total")}</th>
              <th className="p-3 font-semibold text-right w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b group item-row">
                <td className="p-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder={t("item_description_placeholder")}
                    className="w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 outline-none transition-all"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                    className="w-full text-center bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 outline-none transition-all"
                  />
                </td>
                <td className="p-1">
                  <div className="flex items-center w-full bg-transparent border border-transparent hover:border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200 rounded px-2 py-1 transition-all">
                    <input
                      type="text" // <-- Changed to text!
                      inputMode="decimal" // <-- Keeps the number keyboard on mobile
                      placeholder="0.00"
                      
                      // 1. What the input shows:
                      value={item.price === 0 ? '' : item.price}
                      
                      // 2. What happens when they type (removes commas to save pure numbers to your state):
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '');
                        if (!isNaN(rawValue)) {
                          handleItemChange(item.id, 'price', rawValue);
                        }
                      }}

                      // When you click out of the box, format it with commas:
                      onBlur={(e) => {
                        const toInt = Number(String(e.target.value).replace(/,/g, ''));
                        if (toInt) {
                          const formatted = new Intl.NumberFormat('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(Number(toInt));
                          
                          // Save the formatted string back to your state
                          handleItemChange(item.id, 'price', formatted);
                        }
                      }}
                      
                      className="w-full text-right bg-transparent outline-none appearance-none"
                    />
                    <span className="ml-1 select-none">₾</span>
                  </div>
                </td>
                <td className="p-3 text-right text-gray-700">
                  {/* Auto-calculated row total */}
                  {(Number(item.quantity) * Number(String(item.price).replace(/,/g, ''))).toFixed(2)} ₾
                </td>
                <td className="p-2 text-center no-print">
                  {/* Delete Button - Hidden in PDF */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Remove Item"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Row Button - Hidden in PDF */}
        <button 
          onClick={handleAddItem}
          className="no-print mb-8 text-sm text-luxury-button hover:text-luxury-button-hovered font-semibold flex items-center cursor-pointer"
        >
          {t("add_line_item")}
        </button>
        </>
    )
}
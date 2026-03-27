export default function ItemTable({ items, setItems }) {
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
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 font-semibold w-1/2">Description</th>
              <th className="p-3 font-semibold text-center w-1/6">Qty</th>
              <th className="p-3 font-semibold text-right w-1/6">Price</th>
              <th className="p-3 font-semibold text-right w-1/6">Total</th>
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
                    placeholder="Item description..."
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
                <td className="p-2">
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                    className="w-full text-right bg-transparent border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded px-2 py-1 outline-none transition-all"
                  />
                </td>
                <td className="p-3 text-right text-gray-700">
                  {/* Auto-calculated row total */}
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
                <td className="p-2 text-center no-print">
                  {/* Delete Button - Hidden in PDF */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
          className="no-print mb-8 text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center"
        >
          + Add Line Item
        </button>
        </>
    )
}
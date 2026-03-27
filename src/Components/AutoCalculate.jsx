export default function AutoCalculate({ items }) {
    // Auto-calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxRate = 0.18; // 18% tax
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount;
    
    return (
        <div className="flex justify-end mb-12 totals-container">
          <div className="w-1/2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">Tax (18%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold">
              <span>Total Due</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
    )
}
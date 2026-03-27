import BilledTo from '@/BilledTo';
import ItemTable from '@/ItemTable';
import AutoCalculate from '@/AutoCalculate';
import { useState } from 'react';

export default function Body({bodyRef, client, setClient}){
    //State for the line items
    const [items, setItems] = useState([
        { id: Date.now(), description: 'Web Development Services', quantity: 1, price: 1500 }
    ]);
    return(
        <div ref={bodyRef} className="px-12 pt-6 pb-12 bg-white grow">
            {/* Billed To */}
            <BilledTo client={client} setClient={setClient}/>
            {/* Dynamic Line Items Table */}
            <ItemTable items={items} setItems={setItems} />
            {/* Auto-Calculated Totals */}
            <AutoCalculate items={items} />
        </div>
    );
}
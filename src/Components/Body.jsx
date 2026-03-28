import BilledTo from '@/Components/BilledTo';
import ItemTable from '@/Components/ItemTable';
import AutoCalculate from '@/Components/AutoCalculate';
import { useState } from 'react';

export default function Body({bodyRef, client, setClient}){
    //State for the line items
    const [items, setItems] = useState([
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
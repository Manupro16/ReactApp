import Form from "./expense-tracker/components/Form.tsx"
import Table from "./expense-tracker/components/Table.tsx"
import { useState } from "react";
import { FormData } from './expense-tracker/components/Form.tsx';
import { v4 as uuidv4 } from 'uuid';

function App() {

    const [items, setItems] = useState<FormData[]>([]);


    function addItem(itemData: FormData) {
        console.log("hello here is the data", items);
        const newItem = {
            ...itemData,
            id: uuidv4(),

        }

        setItems([...items, newItem]);


    }

    function deleteItem(itemId: string) {
        setItems(items => items.filter(item => item.id !== itemId));
    }

  return (
      <div>
        <Form onSubmitClick={addItem} />
          <Table items={items} onDelete={deleteItem}/>
      </div>
  )
}

export default App

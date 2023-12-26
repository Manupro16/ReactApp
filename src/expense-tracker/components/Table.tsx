import React, { useState } from "react";

interface Item {
    id?: string
    description: string;
    amount: number;
    category: string;

}

interface TableProps {
    items: Item[]
    onDelete: (itemId: string) => void
}

/**
 * React functional component that renders a table with items and a delete button for each item.
 * @param {Item[]} items - an array of items to be displayed in the table
 * @param {function} onDelete - a function that is called when the delete button is clicked
 */
function Table({ items, onDelete } : TableProps) {
    const [selectedCategory, setCategory] = useState("");

    /**
     * This function is called when the value of the select element changes.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - the event object
     */
    function handleState(event: React.ChangeEvent<HTMLSelectElement>) {
        console.log(event.target.value);
        setCategory(event.target.value);
    }

    return (
        <div>
            <div className="mb-3 mt-5">
                <label htmlFor="category" className="form-label">All categories</label>
                <select onChange={handleState} id="category" name="category"
                        className="form-control">
                    <option value="">Select a category</option>
                    <option value="groceries">Groceries</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.filter(item => selectedCategory === "" || item.category === selectedCategory).map((item) => (
                        <tr key={item.id}>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>
                            <td>{item.category}</td>
                            <td>
                                <button onClick={() => onDelete(item.id!)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
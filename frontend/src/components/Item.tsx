import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

interface Item {
    ID: number;
    Name: string;
    Level: number;
    Description: string;
}

const ItemComponent: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>({ ID: 0, Name: '', Level: 1, Description: '' });

    const fetchItems = async () => {
        const data = await apiClient.get('/v1/items');
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const createItem = async () => {
        await apiClient.post('/v1/items', newItem);
        fetchItems();
    };

    const updateItem = async (id: number) => {
        await apiClient.put(`/v1/items/${id}`, newItem);
        fetchItems();
    };

    const deleteItem = async (id: number) => {
        await apiClient.delete(`/v1/items/${id}`);
        fetchItems();
    };

    return (
        <div>
            <h1>Items</h1>
            <input
                type="text"
                placeholder="Item Name"
                value={newItem.Name}
                onChange={(e) => setNewItem({ ...newItem, Name: e.target.value })}
            />
            <button onClick={createItem}>Create Item</button>
            
            <ul>
                {items.map((item) => (
                    <li key={item.ID}>
                        {item.Name} (Level: {item.Level})
                        <button onClick={() => updateItem(item.ID)}>Update</button>
                        <button onClick={() => deleteItem(item.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemComponent;


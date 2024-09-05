import { Request, Response } from 'express';
import { query } from '../../db/index';
import items from '../../fixtures/items.json';

const isDevelopment = process.env.NODE_ENV === 'development';

export const createItem = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(201).json({ message: 'Item created (fake).' });
    }
    const { Name, Level, Description } = req.body;
    const result = await query(
        'INSERT INTO Item (Name, Level, Description) VALUES ($1, $2, $3) RETURNING *',
        [Name, Level, Description]
    );
    res.status(201).json(result.rows[0]);
};

export const getItems = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json(items);
    }
    const result = await query('SELECT * FROM Item', []);
    res.status(200).json(result.rows);
};

export const updateItem = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Item updated (fake).' });
    }
    const { id } = req.params;
    const { Name, Level, Description } = req.body;
    const result = await query(
        'UPDATE Item SET Name = $1, Level = $2, Description = $3 WHERE ID = $4 RETURNING *',
        [Name, Level, Description, id]
    );
    res.status(200).json(result.rows[0]);
};

export const deleteItem = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Item deleted (fake).' });
    }
    const { id } = req.params;
    await query('DELETE FROM Item WHERE ID = $1', [id]);
    res.status(200).json({ message: 'Item deleted' });
};


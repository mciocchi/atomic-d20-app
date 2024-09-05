import { Request, Response } from 'express';
import { query } from '../../db/index';
import characters from '../../fixtures/characters.json';

const isDevelopment = process.env.NODE_ENV === 'development';

export const createCharacter = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(201).json({ message: 'Character created (fake).' });
    }
    const { Name, Level, Description, Aspects, Skills, PracticedManeuvers, Inventory } = req.body;
    const result = await query(
        'INSERT INTO Character (Name, Level, Description, Aspects, Skills, PracticedManeuvers, Inventory) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [Name, Level, Description, Aspects, Skills, PracticedManeuvers, Inventory]
    );
    res.status(201).json(result.rows[0]);
};

export const getCharacters = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json(characters);
    }
    const result = await query('SELECT * FROM Character', []);
    res.status(200).json(result.rows);
};

export const updateCharacter = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Character updated (fake).' });
    }
    const { id } = req.params;
    const { Name, Level, Description, Aspects, Skills, PracticedManeuvers, Inventory } = req.body;
    const result = await query(
        'UPDATE Character SET Name = $1, Level = $2, Description = $3, Aspects = $4, Skills = $5, PracticedManeuvers = $6, Inventory = $7 WHERE ID = $8 RETURNING *',
        [Name, Level, Description, Aspects, Skills, PracticedManeuvers, Inventory, id]
    );
    res.status(200).json(result.rows[0]);
};

export const deleteCharacter = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Character deleted (fake).' });
    }
    const { id } = req.params;
    await query('DELETE FROM Character WHERE ID = $1', [id]);
    res.status(200).json({ message: 'Character deleted' });
};


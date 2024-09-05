import { Request, Response } from 'express';
import { query } from '../../db/index';
import aspects from '../../fixtures/aspects.json';

const isDevelopment = process.env.NODE_ENV === 'development';

export const createAspect = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(201).json({ message: 'Aspect created (fake).' });
    }
    const { Name, Level, Description } = req.body;
    const result = await query(
        'INSERT INTO Aspect (Name, Level, Description) VALUES ($1, $2, $3) RETURNING *',
        [Name, Level, Description]
    );
    res.status(201).json(result.rows[0]);
};

export const getAspects = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json(aspects);
    }
    const result = await query('SELECT * FROM Aspect', []);
    res.status(200).json(result.rows);
};

export const updateAspect = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Aspect updated (fake).' });
    }
    const { id } = req.params;
    const { Name, Level, Description } = req.body;
    const result = await query(
        'UPDATE Aspect SET Name = $1, Level = $2, Description = $3 WHERE ID = $4 RETURNING *',
        [Name, Level, Description, id]
    );
    res.status(200).json(result.rows[0]);
};

export const deleteAspect = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Aspect deleted (fake).' });
    }
    const { id } = req.params;
    await query('DELETE FROM Aspect WHERE ID = $1', [id]);
    res.status(200).json({ message: 'Aspect deleted' });
};


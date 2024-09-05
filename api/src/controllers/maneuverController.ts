import { Request, Response } from 'express';
import { query } from '../../db/index';
import maneuvers from '../../fixtures/maneuvers.json';

const isDevelopment = process.env.NODE_ENV === 'development';

export const createManeuver = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(201).json({ message: 'Maneuver created (fake).' });
    }
    const { Name, Level, Description } = req.body;
    const result = await query(
        'INSERT INTO PracticedManeuver (Name, Level, Description) VALUES ($1, $2, $3) RETURNING *',
        [Name, Level, Description]
    );
    res.status(201).json(result.rows[0]);
};

export const getManeuvers = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json(maneuvers);
    }
    const result = await query('SELECT * FROM PracticedManeuver', []);
    res.status(200).json(result.rows);
};

export const updateManeuver = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Maneuver updated (fake).' });
    }
    const { id } = req.params;
    const { Name, Level, Description } = req.body;
    const result = await query(
        'UPDATE PracticedManeuver SET Name = $1, Level = $2, Description = $3 WHERE ID = $4 RETURNING *',
        [Name, Level, Description, id]
    );
    res.status(200).json(result.rows[0]);
};

export const deleteManeuver = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Maneuver deleted (fake).' });
    }
    const { id } = req.params;
    await query('DELETE FROM PracticedManeuver WHERE ID = $1', [id]);
    res.status(200).json({ message: 'Maneuver deleted' });
};


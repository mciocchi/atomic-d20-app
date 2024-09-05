import { Request, Response } from 'express';
import { query } from '../../db/index';
import skills from '../../fixtures/skills.json';

const isDevelopment = process.env.NODE_ENV === 'development';

export const createSkill = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(201).json({ message: 'Skill created (fake).' });
    }
    const { Name, Level, Description } = req.body;
    const result = await query(
        'INSERT INTO Skill (Name, Level, Description) VALUES ($1, $2, $3) RETURNING *',
        [Name, Level, Description]
    );
    res.status(201).json(result.rows[0]);
};

export const getSkills = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json(skills);
    }
    const result = await query('SELECT * FROM Skill', []);
    res.status(200).json(result.rows);
};

export const updateSkill = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Skill updated (fake).' });
    }
    const { id } = req.params;
    const { Name, Level, Description } = req.body;
    const result = await query(
        'UPDATE Skill SET Name = $1, Level = $2, Description = $3 WHERE ID = $4 RETURNING *',
        [Name, Level, Description, id]
    );
    res.status(200).json(result.rows[0]);
};

export const deleteSkill = async (req: Request, res: Response) => {
    if (isDevelopment) {
        return res.status(200).json({ message: 'Skill deleted (fake).' });
    }
    const { id } = req.params;
    await query('DELETE FROM Skill WHERE ID = $1', [id]);
    res.status(200).json({ message: 'Skill deleted' });
};


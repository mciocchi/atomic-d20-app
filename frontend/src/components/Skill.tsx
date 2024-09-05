import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

interface Skill {
    ID: number;
    Name: string;
    Level: number;
    Description: string;
}

const SkillComponent: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<Skill>({ ID: 0, Name: '', Level: 1, Description: '' });

    const fetchSkills = async () => {
        const data = await apiClient.get('/v1/skills');
        setSkills(data);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const createSkill = async () => {
        await apiClient.post('/v1/skills', newSkill);
        fetchSkills();
    };

    const updateSkill = async (id: number) => {
        await apiClient.put(`/v1/skills/${id}`, newSkill);
        fetchSkills();
    };

    const deleteSkill = async (id: number) => {
        await apiClient.delete(`/v1/skills/${id}`);
        fetchSkills();
    };

    return (
        <div>
            <h1>Skills</h1>
            <input
                type="text"
                placeholder="Skill Name"
                value={newSkill.Name}
                onChange={(e) => setNewSkill({ ...newSkill, Name: e.target.value })}
            />
            <button onClick={createSkill}>Create Skill</button>
            
            <ul>
                {skills.map((skill) => (
                    <li key={skill.ID}>
                        {skill.Name} (Level: {skill.Level})
                        <button onClick={() => updateSkill(skill.ID)}>Update</button>
                        <button onClick={() => deleteSkill(skill.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillComponent;


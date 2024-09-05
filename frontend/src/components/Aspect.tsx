import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

interface Aspect {
    ID: number;
    Name: string;
    Level: number;
    Description: string;
}

const AspectComponent: React.FC = () => {
    const [aspects, setAspects] = useState<Aspect[]>([]);
    const [newAspect, setNewAspect] = useState<Aspect>({ ID: 0, Name: '', Level: 1, Description: '' });

    const fetchAspects = async () => {
        const data = await apiClient.get('/v1/aspects');
        setAspects(data);
    };

    useEffect(() => {
        fetchAspects();
    }, []);

    const createAspect = async () => {
        await apiClient.post('/v1/aspects', newAspect);
        fetchAspects();
    };

    const updateAspect = async (id: number) => {
        await apiClient.put(`/v1/aspects/${id}`, newAspect);
        fetchAspects();
    };

    const deleteAspect = async (id: number) => {
        await apiClient.delete(`/v1/aspects/${id}`);
        fetchAspects();
    };

    return (
        <div>
            <h1>Aspects</h1>
            <input
                type="text"
                placeholder="Aspect Name"
                value={newAspect.Name}
                onChange={(e) => setNewAspect({ ...newAspect, Name: e.target.value })}
            />
            <button onClick={createAspect}>Create Aspect</button>
            
            <ul>
                {aspects.map((aspect) => (
                    <li key={aspect.ID}>
                        {aspect.Name} (Level: {aspect.Level})
                        <button onClick={() => updateAspect(aspect.ID)}>Update</button>
                        <button onClick={() => deleteAspect(aspect.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AspectComponent;


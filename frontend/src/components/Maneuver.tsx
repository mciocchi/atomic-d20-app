import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

interface Maneuver {
    ID: number;
    Name: string;
    Level: number;
    Description: string;
}

const ManeuverComponent: React.FC = () => {
    const [maneuvers, setManeuvers] = useState<Maneuver[]>([]);
    const [newManeuver, setNewManeuver] = useState<Maneuver>({ ID: 0, Name: '', Level: 1, Description: '' });

    const fetchManeuvers = async () => {
        const data = await apiClient.get('/v1/maneuvers');
        setManeuvers(data);
    };

    useEffect(() => {
        fetchManeuvers();
    }, []);

    const createManeuver = async () => {
        await apiClient.post('/v1/maneuvers', newManeuver);
        fetchManeuvers();
    };

    const updateManeuver = async (id: number) => {
        await apiClient.put(`/v1/maneuvers/${id}`, newManeuver);
        fetchManeuvers();
    };

    const deleteManeuver = async (id: number) => {
        await apiClient.delete(`/v1/maneuvers/${id}`);
        fetchManeuvers();
    };

    return (
        <div>
            <h1>Practiced Maneuvers</h1>
            <input
                type="text"
                placeholder="Maneuver Name"
                value={newManeuver.Name}
                onChange={(e) => setNewManeuver({ ...newManeuver, Name: e.target.value })}
            />
            <button onClick={createManeuver}>Create Maneuver</button>
            
            <ul>
                {maneuvers.map((maneuver) => (
                    <li key={maneuver.ID}>
                        {maneuver.Name} (Level: {maneuver.Level})
                        <button onClick={() => updateManeuver(maneuver.ID)}>Update</button>
                        <button onClick={() => deleteManeuver(maneuver.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManeuverComponent;


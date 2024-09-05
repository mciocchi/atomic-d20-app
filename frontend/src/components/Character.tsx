import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

interface Character {
    ID: number;
    Name: string;
    Level: number;
    Description: string;
    Aspects: number[];
    Skills: number[];
    PracticedManeuvers: number[];
    Inventory: number[];
}

const CharacterComponent: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [newCharacter, setNewCharacter] = useState<Character>({
        ID: 0,
        Name: '',
        Level: 1,
        Description: '',
        Aspects: [],
        Skills: [],
        PracticedManeuvers: [],
        Inventory: []
    });

    // Fetch all characters
    const fetchCharacters = async () => {
        const data = await apiClient.get('/v1/characters');
        setCharacters(data);
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    // Handle creating a new character
    const createCharacter = async () => {
        await apiClient.post('/v1/characters', newCharacter);
        fetchCharacters();
    };

    // Handle updating a character
    const updateCharacter = async (id: number) => {
        await apiClient.put(`/api/v1/characters/${id}`, newCharacter);
        fetchCharacters();
    };

    // Handle deleting a character
    const deleteCharacter = async (id: number) => {
        await apiClient.delete(`/api/v1/characters/${id}`);
        fetchCharacters();
    };

    return (
        <div>
            <h1>Characters</h1>
            <input
                type="text"
                placeholder="Character Name"
                value={newCharacter.Name}
                onChange={(e) => setNewCharacter({ ...newCharacter, Name: e.target.value })}
            />
            <button onClick={createCharacter}>Create Character</button>
            
            <ul>
                {characters.map((character) => (
                    <li key={character.ID}>
                        {character.Name} (Level: {character.Level})
                        <button onClick={() => updateCharacter(character.ID)}>Update</button>
                        <button onClick={() => deleteCharacter(character.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterComponent;


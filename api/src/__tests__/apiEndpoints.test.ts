import request from 'supertest';
import app from '../app'; // Assuming your Express app is exported from app.ts or index.ts

describe('Atomic D20 API Endpoints', () => {
    // Test Skills API
    describe('Skills Endpoints', () => {
        it('should create a new skill', async () => {
            const res = await request(app).post('/skills').send({
                Name: 'New Skill',
                Level: 1,
                Description: 'A new test skill'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Skill created (fake).');
        });

        it('should retrieve all skills', async () => {
            const res = await request(app).get('/skills');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(3); // As per the fixture
        });

        it('should update a skill', async () => {
            const res = await request(app).put('/skills/1').send({
                Name: 'Updated Skill',
                Level: 2,
                Description: 'Updated test skill'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Skill updated (fake).');
        });

        it('should delete a skill', async () => {
            const res = await request(app).delete('/skills/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Skill deleted (fake).');
        });
    });

    // Test Aspects API
    describe('Aspects Endpoints', () => {
        it('should create a new aspect', async () => {
            const res = await request(app).post('/aspects').send({
                Name: 'New Aspect',
                Level: 2,
                Description: 'A new test aspect'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Aspect created (fake).');
        });

        it('should retrieve all aspects', async () => {
            const res = await request(app).get('/aspects');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(3); // As per the fixture
        });

        it('should update an aspect', async () => {
            const res = await request(app).put('/aspects/1').send({
                Name: 'Updated Aspect',
                Level: 4,
                Description: 'Updated test aspect'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Aspect updated (fake).');
        });

        it('should delete an aspect', async () => {
            const res = await request(app).delete('/aspects/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Aspect deleted (fake).');
        });
    });

    // Test Items API
    describe('Items Endpoints', () => {
        it('should create a new item', async () => {
            const res = await request(app).post('/items').send({
                Name: 'New Item',
                Level: 3,
                Description: 'A new test item'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Item created (fake).');
        });

        it('should retrieve all items', async () => {
            const res = await request(app).get('/items');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(3); // As per the fixture
        });

        it('should update an item', async () => {
            const res = await request(app).put('/items/1').send({
                Name: 'Updated Item',
                Level: 4,
                Description: 'Updated test item'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Item updated (fake).');
        });

        it('should delete an item', async () => {
            const res = await request(app).delete('/items/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Item deleted (fake).');
        });
    });

    // Test Maneuvers API
    describe('Maneuvers Endpoints', () => {
        it('should create a new maneuver', async () => {
            const res = await request(app).post('/maneuvers').send({
                Name: 'New Maneuver',
                Level: 2,
                Description: 'A new test maneuver'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Maneuver created (fake).');
        });

        it('should retrieve all maneuvers', async () => {
            const res = await request(app).get('/maneuvers');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(3); // As per the fixture
        });

        it('should update a maneuver', async () => {
            const res = await request(app).put('/maneuvers/1').send({
                Name: 'Updated Maneuver',
                Level: 3,
                Description: 'Updated test maneuver'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Maneuver updated (fake).');
        });

        it('should delete a maneuver', async () => {
            const res = await request(app).delete('/maneuvers/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Maneuver deleted (fake).');
        });
    });

    describe('Character Endpoints', () => {
        // Test Create operation for Character
        it('should create a new character', async () => {
            const res = await request(app).post('/characters').send({
                Name: 'New Character',
                Level: 1,
                Description: 'A new test character',
                Aspects: [1, 2],
                Skills: [3, 4],
                PracticedManeuvers: [5],
                Inventory: [6, 7]
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Character created (fake).');
        });

        // Test Read operation (retrieving all characters)
        it('should retrieve all characters', async () => {
            const res = await request(app).get('/characters');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBeGreaterThanOrEqual(1); // Assuming you have character fixtures
        });

        // Test Update operation for a Character
        it('should update an existing character', async () => {
            const res = await request(app).put('/characters/1').send({
                Name: 'Updated Character',
                Level: 2,
                Description: 'Updated character description',
                Aspects: [2],
                Skills: [3],
                PracticedManeuvers: [6],
                Inventory: [8]
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Character updated (fake).');
        });

        // Test Delete operation for a Character
        it('should delete a character', async () => {
            const res = await request(app).delete('/characters/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Character deleted (fake).');
        });
    });
});

app.server.close()


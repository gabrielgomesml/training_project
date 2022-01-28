import { createConnection, getConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../app';

const existingUserId = '';
const existingUserEmail = '';
const existingUserPassword = '';
let token: string;

describe('Users', () => {
    beforeAll(async () => {
        await createConnection();
    });

    // AUTH TESTS

    it('GET: Should not return all users from the database because you are not authenticated', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(401);
    });

    it('POST: Should be able to authenticate', async () => {
        const response = await request(app).post('/user-auth').send({
            email: existingUserEmail,
            password: existingUserPassword,
        });
        token = response.body.token;
        expect(response.status).toBe(200);
    });

    // POST TESTS

    it('POST: Should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            password: 'examplepassword',
            name: 'user',
            surname: 'example',
            photo_address:
                'https://upload.wikimedia.org/wikipedia/commons/9/95/Alex_Turner%2C_Way_Out_West_2018.jpg',
            phone: '(81) 98562-7583',
            role: 0,
            active: true,
        });
        expect(response.status).toBe(201);
    });

    it('POST: Should be able to create a new user without passing phone and photo_address properties', async () => {
        const response = await request(app).post('/users').send({
            email: 'userTwo@example.com',
            password: 'examplepassword',
            name: 'userTwo',
            surname: 'example',
            role: 1,
            active: false,
        });
        expect(response.status).toBe(201);
    });

    it('POST: Should not be able to create a new user without passing mandatory properties. In this case, not passing the name', async () => {
        const response = await request(app).post('/users').send({
            email: 'userThree@example.com',
            password: 'examplepassword',
            surname: 'example',
            photo_address:
                'https://upload.wikimedia.org/wikipedia/commons/9/95/Alex_Turner%2C_Way_Out_West_2018.jpg',
            phone: '(00) 00000-0000',
            role: 0,
            active: false,
        });
        expect(response.status).toBe(400);
    });

    it('POST: Should not be able to create a new user with the same e-mail of an user created before', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            password: 'examplepassword',
            name: 'userFour',
            surname: 'example',
            photo_address:
                'https://upload.wikimedia.org/wikipedia/commons/9/95/Alex_Turner%2C_Way_Out_West_2018.jpg',
            phone: '(00) 00000-0000',
            role: 0,
            active: true,
        });
        expect(response.status).toBe(400);
    });

    // GET TESTS

    it('GET: Should return all users from the database', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('GET: Should return a specific user from the database', async () => {
        const response = await request(app)
            .get(`/users/${existingUserId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('GET: Should return 400 when passing an incorrect format id', async () => {
        const response = await request(app)
            .get('/users/3231313213')
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
    });

    it('GET: Should return 404 not found when passing a not existing id', async () => {
        const response = await request(app)
            .get('/users/0abfbb3a-52e9-4573-af9e-4846c0e17491')
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(404);
    });

    // PATCH TESTS

    it('PATCH: Should be able to update a property from an existing user', async () => {
        const response = await request(app)
            .patch(`/users/${existingUserId}`)
            .send({
                surname: 'surname modified',
            })
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('PATCH: Should return 404 not found when passing a not existing id', async () => {
        const response = await request(app)
            .patch('/users/0abfbb3a-52e9-4573-af9e-4846c0e17491')
            .send({
                surname: 'surname modified',
            })
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(404);
    });

    it('PATCH: Should return 400 when passing an incorrect format id', async () => {
        const response = await request(app)
            .patch('/users/3231313213')
            .send({
                surname: 'surname modified',
            })
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
    });

    // DELETE TESTS

    it('DELETE: Should delete a specific user from the database', async () => {
        const response = await request(app)
            .delete(`/users/${existingUserId}`)
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('DELETE: Should return 400 when passing an incorrect format id', async () => {
        const response = await request(app)
            .delete('/users/3231313213')
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(400);
    });

    it('DELETE: Should return 404 not found when passing a not existing id', async () => {
        const response = await request(app)
            .delete('/users/0abfbb3a-52e9-4573-af9e-4846c0e17491')
            .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(404);
    });

    afterAll(async () => {
        const defaultConnection = getConnection('default');
        await defaultConnection.close();
    });
});

import connection_db from '../database/connection_db.js';
import UsersModel from '../models/userModel.js';

describe('UsersModel', () => {
    beforeAll(async () => {
        try {
            await connection_db.authenticate(); 
            await connection_db.sync();
            console.log('Database connection successful');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    });

    afterAll(async () => {
        await connection_db.close();
    });

    test('UsersModel should be defined', () => {
        expect(UsersModel).toBeDefined();
    });

    test('should create a new user', async () => {
        const userData = {
            name: 'Eliana',
            email: 'eliana@example.com',
            password: 'elipassword'
        };

        const user = await UsersModel.create(userData);
        expect(user.id).toBeDefined();
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
        expect(user.password).toBe(userData.password);
    });

    test('should find a user by email', async () => {
      const email = 'eliana@example.com';
      const user = await UsersModel.findOne({ where: { email } });

      expect(user).toBeDefined();
      expect(user.email).toBe(email);
  });

  test('should delete an existing user', async () => {
    const email = 'eliana@example.com';
    
    const user = await UsersModel.findOne({ where: { email } });
    expect(user).toBeDefined(); 


    await UsersModel.destroy({ where: { email } });

    const deletedUser = await UsersModel.findOne({ where: { email } });

    expect(deletedUser).toBeNull();
});
});

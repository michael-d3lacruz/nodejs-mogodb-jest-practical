import {
  User,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../models/users.models';
import { client } from '../utils/database/mongo.conn';

// Test user data
const data: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@test.com',
  password: 'password123',
};

describe('Users', () => {
  it('should create a new user', async () => {
    await createUser(data);

    const user = await getUserById(1);

    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'john.doe@test.com');
    expect(user).toHaveProperty('password', 'password123');
  });

  it('should get all users', async () => {
    const users = await getUsers();

    expect(users.length).toBeGreaterThan(0);
  });

  it('should get user by id', async () => {
    const user = await getUserById(1);

    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'john.doe@test.com');
    expect(user).toHaveProperty('password', 'password123');
  });

  it('should update user by id', async () => {
    const data = {
      id: 1,
      name: 'Mary Doe',
      email: 'mary.doe@test.com',
      password: 'password123',
    };

    await updateUser(data);

    const user = await getUserById(1);

    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'Mary Doe');
    expect(user).toHaveProperty('email', 'mary.doe@test.com');
    expect(user).toHaveProperty('password', 'password123');
  });

  it('should delete user by id', async () => {
    await deleteUser(1);
    const user = await getUserById(1);

    expect(user).toBeNull();
  });

  afterAll(async () => {
    await client.close();
  });
});

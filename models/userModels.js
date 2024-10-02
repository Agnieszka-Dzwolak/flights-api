import { v4 as Id } from 'uuid';

const users = [
    {
        id: Id(),
        email: 'agaaa@gmail.com',
        password: '12345'
    }
];

class User {
    static getByEmail(email) {
        return users.find((user) => user.email === email);
    }

    static add(user) {
        const newUser = {
            id: Id(),
            ...user
        };
        users.unshift(newUser);
        return newUser;
    }
}

export default User;

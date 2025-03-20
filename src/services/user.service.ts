interface User {
    id: string;
    name: string;
    email: string;
}

// Datos ficticios simulando una base de datos
const users: User[] = [
    { id: "abc", name: 'Juan', email: 'juan@example.com' },
    { id: "def", name: 'María', email: 'maria@example.com' },
];

export const getAllUsers = async (): Promise<User[]> => {
    return users;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    return users.find(user => user.id === id);
};
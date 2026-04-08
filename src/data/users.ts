import type { User } from "../interfaces/User";

export const mockUsers: User[] = [
    {
        id: 1,
        name: "Alice Ruberta",
        email: "alice@example.com",
        password: "alice123",
        role: "admin",
        createdAt: 1700000000000,
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        password: "bob123",
        role: "user",
        createdAt: 1700000001000,
    },
    {
        id: 3,
        name: "Carol White",
        email: "carol@example.com",
        password: "carol123",
        role: "user",
        createdAt: 1700000002000,
    },
]
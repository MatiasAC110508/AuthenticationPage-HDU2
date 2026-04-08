import type {  User, CreateUserInput, UpdateUserInput } from "../interfaces/User";
import { mockUsers } from "../data/users";
import { withUserDefaults } from "./decorators";

export class UserStore {
    private users: User[] = [...mockUsers];

    list(): User[] {
        console.log("[GET] /api/users — fetching all users");
        return [...this.users];
    }

    findByName(name: string): User | undefined {
        console.log(`[GET] /api/users?name=${encodeURIComponent(name)} — searching by name`);
        return this.users.find(
            (u) => u.name.toLowerCase() === name.toLocaleLowerCase()
        );
    }

    @withUserDefaults
    create(userData: CreateUserInput & Partial<Pick<User, "role" | "createdAt">>): User {
        console.log("[POST] /api/users — creating new user");
        const newUser: User = {
        ...userData,
        id: Date.now(),
        role: userData.role ?? "user",
        createdAt: userData.createdAt ?? Date.now(),
        };
        this.users.push(newUser);
        return newUser;
    }
    
    update(id: number, updates: UpdateUserInput): User | null {
        console.log(`[PATCH] /api/users/${id} — updating user`);
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) return null;
        this.users[index] = { ...this.users[index], ...updates };
        return { ...this.users[index] };
    }
    
    remove(id: number): boolean {
        console.log(`[DELETE] /api/users/${id} — removing user`);
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }
}



// Base User interface representing the full structure of a user in the system
export interface User {
    id: number;      
    name: string;        
    email: string;       
    password: string;     
    role: string;         
    createdAt: number;    
}

// SafeUser removes the password field from User
// Omit<Type, Keys> creates a new type by excluding specific keys from an existing type
// This is useful when returning user data to the client without exposing sensitive information
export type SafeUser = Omit<User, "password">;

// CreateUserInput selects only the fields required to create a new user
// Pick<Type, Keys> creates a new type by selecting only specific properties from an existing type
// This ensures only necessary data is provided when creating a user
export type CreateUserInput = Pick<User, "name" | "email" | "password">;

// UpdateUserInput allows partial updates to a user
// First, Omit removes the "id" field because it should not be updated
// Then, Partial makes all remaining fields optional
// Partial<Type> converts all properties of a type into optional properties
// This is useful for update operations where not all fields are required
export type UpdateUserInput = Partial<Omit<User, "id">>;

// Represents the credentials required for authentication (login)
export interface AuthCredentials {
    email: string;       
    password: string;    
}

// Represents the result of an authentication attempt
export interface AuthResult {
    success: boolean;    
    user?: SafeUser;      // Optional user data returned if login succeeds (without password)
    message: string;    
}
import type { AuthCredentials, AuthResult } from "../interfaces/User";
import { mockUsers } from "../data/users";

export function authenticate(credentials: AuthCredentials): AuthResult {
    // Finds a user whose email and password match the provided credentials
    const found = mockUsers.find((u) => 
        u.email === credentials.email && u.password === credentials.password
    );
    
    // If no match is found, return a failed authentication result
    if (!found) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    // Object destructuring:
    // Extracts "password" into a variable (_omitted) and collects the rest into "safeUser"
    // This effectively removes the password field from the returned user object
    const { password: _omitted, ...safeUser } = found;

    return {
        success: true,
        user: safeUser, // SafeUser type: does not include password
        message: "Authentication successful."
    };
}
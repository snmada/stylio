import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { generateToken } from "../utils/jwtUtils.js";

export const register = async ({ firstName, lastName, email, password }) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser)
        throw new Error("This email is already associated with an account");
  
    const hashedPassword = await bcrypt.hash(password, 10);

    return await createUser({ firstName, lastName, email, password: hashedPassword });
};
  
export const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user)
        throw new Error("No account found with this email");
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid)
        throw new Error("Invalid credentials");
  
    return generateToken(user);
};
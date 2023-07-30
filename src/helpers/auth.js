import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  return await hash(password, 2);
}

export async function verfyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

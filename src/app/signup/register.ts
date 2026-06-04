"use server";

import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Validation check
  if (!email || !password || !name) {
    return { error: "All profile fields are explicitly required." };
  }

  try {
    // 2. Check if the user already exists in Supabase
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      return { error: "This email address is already registered." };
    }

    // 3. Hash the password safely using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Store user records cleanly inside your database
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "client", // Assigns them the default B2B client tier
    });

    return { success: "Account constructed successfully!" };
  } catch (err) {
    console.error("Registration database error:", err);
    return { error: "Critical internal database write anomaly occurred." };
  }
}
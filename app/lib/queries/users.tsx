import bcrypt from "bcryptjs";
import { supabase } from "../supabase-client";

// Get user - by email/username
export async function checkUserExists(username: string | null | undefined) {
  try {
    if (!username) return undefined;

    const { data: user, error } = await supabase
      .from("softwares_users")
      .select("*")
      .or(`email.eq.${username},username.eq.${username}`)
      .eq("isactive", true)
      .single();

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error checking user:", error.message);
      }
      return { error: "Error checking user: Please try again!" };
    }

    return user;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error checking user existence:", error);
    }
    return { error: "Error checking user: Please try again" };
  }
}

// Get User by Id
export async function getUserById(userid: string) {
  try {
    const { data: user, error } = await supabase
      .from("softwares_users")
      .select("*")
      .eq("id", userid)
      .maybeSingle();

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error fetching users:", error.message);
      }
      return { error: "Error fetching users: Please try again!" };
    }

    return { user };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching user existence:", error);
    }
    return { error: "Error fetching user: Please try again" };
  }
}

// Get all Users
export async function getAllUsers() {
  try {
    const { data: users, error } = await supabase
      .from("softwares_users")
      .select("*");

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error fetching users:", error.message);
      }
      return { error: "Error fetching users: Please try again!" };
    }

    return { users };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching user existence:", error);
    }
    return { error: "Error fetching user: Please try again" };
  }
}

// create new user
export async function createUser(userData: any) {
  try {
    const { username, password, email, name, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmail = email ? email : `${username}@example.com`;

    const { data, error } = await supabase.from("softwares_users").insert([
      {
        name,
        username,
        email: newEmail,
        password: hashedPassword,
        role,
        isactive: true,
      },
    ]);

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error creating user:", error.message);
      }
      return { error: "Error creating user: Please try again!" };
    }

    return { data };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error creating user:", error);
    }
    return { error: "Error creating user: Please try again" };
  }
}

export async function updateUser(userId: string, updatedData: any) {
  if (updatedData.password) {
    const hashedPassword = await bcrypt.hash(updatedData.password, 10);
    updatedData.password = hashedPassword;
  }

  try {
    const { data, error } = await supabase
      .from("softwares_users")
      .update({
        ...updatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error updating user:", error.message);
      }
      return { error: "Error updating user. Please try again!" };
    }

    return { data };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error updating user:", error);
    }
    return { error: "Error updating user. Please try again!" };
  }
}

// Change password
export async function changePassword(userId: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { error } = await supabase
      .from("softwares_users")
      .update({
        password: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error changing password:", error.message);
      }
      return { error: "Error changing password. Please try again!" };
    }

    return { message: "Password changed successfully" };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error changing password:", error);
    }
    return { error: "Error changing password. Please try again!" };
  }
}

export async function deleteUser(userId: string) {
  try {
    const { error } = await supabase
      .from("softwares_users")
      .delete()
      .eq("id", userId);

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error deleting user:", error.message);
      }
      return { error: "Error deleting user. Please try again!" };
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting user:", error);
    }
    return { error: "Error deleting user. Please try again!" };
  }
}

import { supabase } from "../supabase-client";

export async function getUserCategories() {
  try {
    const { data: categories, error } = await supabase
      .from("user_categories")
      .select("*");

    if (error) {
      return { error: "Error fetching categories, Please try again!" };
    }
    return { categories };
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}

export async function getUserCategoryById(id: string) {
  try {
    const { data: category, error } = await supabase
      .from("user_categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { error: "Error fetching categories, Please try again!" };
    }
    return { category };
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}

export async function getUserCategoryByName(name: string) {
  try {
    const { data: category, error } = await supabase
      .from("user_categories")
      .select("*")
      .eq("name", name)
      .single();

    if (error) {
      return { error: "Error fetching categories, Please try again!" };
    }
    return { category };
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}

export async function getSoftwareCategories() {
  try {
    const { data: categories, error } = await supabase
      .from("software_categories")
      .select("*");

    if (error) {
      return { error: "Error fetching software categories, Please try again!" };
    }
    return { categories };
  } catch (error) {
    console.error("Error fetching user categories:", error);
    throw error;
  }
}

export async function getSoftwareCategoryId(categoryName: string) {
  try {
    const { data: category, error } = await supabase
      .from("software_categories")
      .select("id")
      .eq("name", categoryName.charAt(0).toUpperCase() + categoryName.slice(1))
      .single();

    if (error || !category) {
      return {
        id: null,
        error: "Error fetching category id, Please try again!",
      };
    }

    return { id: category.id, error: null };
  } catch {
    return { id: null, error: "Error fetching category id, Please try again!" };
  }
}

import { supabase } from "../supabase-client";

export async function getSoftwares(
  softwareCategoryId: string,
  userCategoryId?: string
) {
  try {
    const { data, error } = await supabase
      .from("softwares")
      .select(
        `
      *,
      category_id(id,name),
      software_user_categories (
        user_categories(id,name)
      )
    `
      )
      .eq("category_id", softwareCategoryId);

    if (error) {
      throw new Error("Error fetching Softwares, Please try again.");
    }

    let filteredData = data;
    if (userCategoryId) {
      filteredData = filteredData?.filter((software: any) =>
        software.software_user_categories?.some(
          (rel: any) => rel.user_categories?.id === userCategoryId
        )
      );
    }

    return filteredData;
  } catch (error) {
    return { error: "Error fetching Softwares, Please try again." };
  }
}

// New software
export async function uploadSoftware(softwareData: any) {
  const { data, error } = await supabase
    .from("softwares")
    .insert([softwareData])
    .select("id")
    .single();

  if (error) {
    return { error: "Error uploading Software, Please try again." };
  }

  return { softwareId: data.id };
}

// Map Users to softwares
export async function mapUserToSoftware(relationData: any) {
  const { data, error } = await supabase
    .from("software_user_categories")
    .insert(relationData);

  if (error) {
    return { error: "Error mapping user to software, Please try again." };
  }

  return { data };
}

// Update software
export async function updateSoftware(id: string, softwareData: any) {
  try {
    const { data, error } = await supabase
      .from("softwares")
      .update(softwareData)
      .eq("id", id)
      .select();

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error updating Software:", error.message);
      }
      return { error: "Error updating Software: Please try again!" };
    }

    return { data };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error updating Software:", error);
    }
    return { error: "Error updating Software: Please try again!" };
  }
}

// Map Users to softwares - upsert
export async function upsertUserToSoftware(id: string, userData: any) {
  // 1. Fetch existing mappings from DB
  const { data: existingMappings, error } = await supabase
    .from("software_user_categories")
    .select("user_category_id")
    .eq("software_id", id);

  if (error) return { error: "Failed to fetch existing mappings" };

  const existingIds = existingMappings.map((m) => m.user_category_id);
  const updatedIds = userData;

  // 2. Determine additions and deletions
  const toAdd = updatedIds.filter((id: any) => !existingIds.includes(id));
  const toRemove = existingIds.filter((id) => !updatedIds.includes(id));

  // 3. Remove unwanted mappings
  if (toRemove.length > 0) {
    const { error: deleteError } = await supabase
      .from("software_user_categories")
      .delete()
      .match({ software_id: id })
      .in("user_category_id", toRemove);

    if (deleteError) return { error: "Error removing old mappings" };
  }

  // 4. Add new mappings
  if (toAdd.length > 0) {
    const relationData = toAdd.map((userCatId: string) => ({
      software_id: id,
      user_category_id: userCatId,
    }));

    const { error: insertError } = await supabase
      .from("software_user_categories")
      .insert(relationData);

    if (insertError) {
      return { error: "Error mapping user categories" };
    }

    return { message: "Success" };
  }

  return { message: "Success" };
}

// Delete software
export async function deleteSoftware(id: string) {
  try {
    const { error } = await supabase.from("softwares").delete().eq("id", id);

    if (error) {
      return { error: "Error deleting Software, Please try again." };
    }

    return { success: true };
  } catch (error) {
    return { error: "Error deleting Software, Please try again." };
  }
}

// Delete mapping
export async function deleteUserToSoftwareMap(
  softwareId: string,
  userCategoryId: string
) {
  try {
    const { error } = await supabase
      .from("software_user_categories")
      .delete()
      .eq("software_id", softwareId)
      .eq("user_category_id", userCategoryId);

    if (error) {
      return {
        error: "Error deleting user to software mapping, Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      error: "Error deleting user to software mapping, Please try again.",
    };
  }
}


import { supabase } from "@/integrations/supabase/client";

/**
 * Adds a user to the admin_users table
 * Note: This should only be used during development or by a super admin
 * For production, you would want to implement a proper admin management system
 */
export async function addAdminUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .insert([{ id: userId }]);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error("Error adding admin user:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Checks if the current user is an admin
 */
export async function checkIfUserIsAdmin() {
  try {
    const { data, error } = await supabase.rpc('is_admin');
    if (error) throw error;
    return { isAdmin: !!data, error: null };
  } catch (error: any) {
    console.error("Error checking if user is admin:", error.message);
    return { isAdmin: false, error: error.message };
  }
}

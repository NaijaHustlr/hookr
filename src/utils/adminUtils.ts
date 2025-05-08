
import { supabase } from "@/integrations/supabase/client";

// List of admin user IDs
// In a production app, you would store this in the database with proper RLS
const ADMIN_USER_IDS = [
  // Add your admin user IDs here (the UUID from Supabase)
];

/**
 * Check if the current user is an admin
 */
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    return ADMIN_USER_IDS.includes(user.id);
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

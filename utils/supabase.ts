import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://unrhmvzxjpkibttjigom.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVucmhtdnp4anBraWJ0dGppZ29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDg4MjUsImV4cCI6MjA3OTIyNDgyNX0.SInEya-vfQB01C0BXqGz75SH6q8aVDcsDX-T_Wm_vA0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

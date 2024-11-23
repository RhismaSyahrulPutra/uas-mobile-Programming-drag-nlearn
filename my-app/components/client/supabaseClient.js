import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tiqhrhvbtirvraxtyuwf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpcWhyaHZidGlydnJheHR5dXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNTk4NzksImV4cCI6MjA0NzkzNTg3OX0.7tXS4sTNuP9w5eGRWLHGOaaNCO9aOefsZ2_0zlYe1og";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

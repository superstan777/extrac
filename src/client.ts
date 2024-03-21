import { createClient } from "@supabase/supabase-js";
import { type Database } from "./supabase";

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

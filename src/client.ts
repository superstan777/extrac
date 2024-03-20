import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

const url: string = process.env.REACT_APP_SUPABASE_URL as string;
const api: string = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(url, api);

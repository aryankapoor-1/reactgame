import { createClient } from "@supabase/supabase-js";

// Ensure your environment variables are loaded correctly
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { score } = req.body;
  if (typeof score !== "number" || isNaN(score)) {
    return res.status(400).json({ error: "Invalid score" });
  }

  try {
    const { data, error } = await supabase.from("scores").insert({ score });

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error inserting score:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

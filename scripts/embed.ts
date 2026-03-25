import * as XLSX from "xlsx";
import { EMBEDDING_MODEL } from "@/lib/config";
import { getSupabase  } from "@/lib/supabase";

async function embedExcel() {
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabase = getSupabase();  // ← lages her, etter env er lastet
  // Les Excel-filen
  const workbook = XLSX.readFile("data/planter.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet) as Record<string, string>[];

  console.log(`Fant ${rows.length} rader`);

  for (const row of rows) {
    // Gjør om rad til tekst
    const content = Object.entries(row)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    // Lag embedding
    const embedding = await EMBEDDING_MODEL.embedText(content);

    // Lagre i Supabase
    const { error } = await supabase.from("documents").insert({
      content,
      embedding,
    });

    if (error) console.error("Feil:", error);
    else console.log("Lagret:", content.slice(0, 50));
  }

  console.log("Ferdig!");
}

embedExcel();
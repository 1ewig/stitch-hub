import fs from "fs";
import path from "path";

// Manually load .env.local BEFORE importing db to prevent hoisting issues
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        // Remove quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
}

async function main() {
  console.log("Seeding materials inventory with environment database...");
  
  const { db } = await import("./index");
  const { materialsInventory } = await import("./schema");

  const items = [
    {
      productName: "Premium Heavyweight Hoodie (Stitch Hub Original)",
      stockQuantity: 10, // Depleted (to test shortage with 150 request)
      reorderLevel: 20,
    },
    {
      productName: "Minimalist Corporate Polo (Stitch Hub Original)",
      stockQuantity: 100,
      reorderLevel: 20,
    },
    {
      productName: "Insulated Matte Tumbler (Stitch Hub Original)",
      stockQuantity: 100,
      reorderLevel: 20,
    },
    {
      productName: "EDC Tech Organizer Pouch (Stitch Hub Original)",
      stockQuantity: 100,
      reorderLevel: 20,
    },
    {
      productName: "Framed Acoustic Art Panel (Stitch Hub Original)",
      stockQuantity: 100,
      reorderLevel: 20,
    },
  ];

  for (const item of items) {
    await db.insert(materialsInventory).values(item).onConflictDoUpdate({
      target: materialsInventory.productName,
      set: {
        stockQuantity: item.stockQuantity,
        reorderLevel: item.reorderLevel,
      },
    });
  }

  console.log("Inventory seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Inventory seeding failed:", err);
  process.exit(1);
});

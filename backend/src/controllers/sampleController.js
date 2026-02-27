
import pool from "../config/postgres.js";

export const getSampleData = async (req, res) => {
  try {
    // Step 1: Get table names (only employees and departments)
    const tablesResult = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('employees', 'departments')"
    );

    const tables = [];

    
    for (let table of tablesResult.rows) {

      const tableName = table.table_name;

      //  Get columns of that table
      const columns = await pool.query(
        "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1",
        [tableName]
      );

      // S Get first 5 rows from that table
      const rows = await pool.query(
        `SELECT * FROM ${tableName} LIMIT 5`
      );

      //  Store everything in array
      tables.push({
        name: tableName,
        schema: columns.rows,
        sampleRows: rows.rows
      });
    }

    
    if (tables.length === 0) {
      return res.status(404).json({ message: "No sample tables found" });
    }

    
    res.json({ tables });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to load sample data" });
  }
};
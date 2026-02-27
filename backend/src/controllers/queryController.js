// Query controller (updated for Groq API with better hints)

import pool from "../config/postgres.js";
import axios from "axios";
import "dotenv/config";

export const executeUserQuery = async (req, res) => {
    const { sqlQuery } = req.body;

    if (!sqlQuery) {
        return res.status(400).json({ message: "Query is required" });
    }

    if (!sqlQuery.toLowerCase().startsWith("select")) {
        return res.status(400).json({ message: "Only SELECT queries are allowed" });
    }

    try {
        const result = await pool.query(sqlQuery);

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getHintFromGrok = async (req, res) => {
    const { questionText, userQuerySoFar } = req.body;

    if (!questionText) {
        return res.status(400).json({ message: "Question is required" });
    }

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",  // ← changed to Groq endpoint
            {
                model: "llama-3.3-70b-versatile",  // ← your requested model
                messages: [
                    {
                        role: "system",
                        content: `You are a strict but kind SQL tutor for beginners.
                Give ONLY one short, very specific hint (1 sentence max).
                Always look at the student's query and point out exact mistakes:
                - Wrong column names → tell them the correct ones from typical tables like 'employees'
                - Missing FROM clause → remind them to add FROM employees
                - Never give code or full solution.
                - Be direct and clear, e.g.:
                  "Instead of 'name' and 'sal', use 'first_name', 'last_name' and 'salary' from the employees table."
                  "You forgot the FROM clause — add FROM employees after SELECT."`
                    },
                    {
                        role: "user",
                        content: `Question: Show names and salaries of employees
                Student attempt: ${userQuerySoFar || "nothing yet"}
                Give one precise hint correcting their mistakes.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 150
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROK_API_KEY}`,  // ← your Groq key (gsk_...)
                    "Content-Type": "application/json"
                }
            }
        );

        const hint = response.data.choices[0].message.content.trim();

        res.json({
            success: true,
            hint: hint
        });

    } catch (error) {
        console.error("Message:", error.message);
        
        res.status(500).json({
            message: "Could not get hint",
           
        });
    }
};
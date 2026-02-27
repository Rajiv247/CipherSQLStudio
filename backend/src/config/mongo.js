

import dns from "node:dns";

dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);


import mongoose from "mongoose";

import "dotenv/config";


import Assignment from "../models/Assignment.js";




async function connectMongo() {
  try {
  
    await mongoose.connect(process.env.MONGO_URL);

    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.log(" MongoDB Connection Failed");
    console.log(error.message);
  }
}




async function seedAssignmentsIfEmpty() {
  try {

    
    const totalAssignments = await Assignment.countDocuments();

    
    if (totalAssignments > 0) {
      console.log("Assignments already exist. No need to seed.");
      return;
    }

    
    const sampleAssignments = [

     
      {
        title: "Show all employees",
        difficulty: "Easy",
        question:
          "Show first_name, last_name and salary of all employees sorted by salary in descending order.",

        sampleTables: [
          {
            tableName: "employees",
            columns: [
              { columnName: "id", dataType: "INTEGER" },
              { columnName: "first_name", dataType: "TEXT" },
              { columnName: "last_name", dataType: "TEXT" },
              { columnName: "salary", dataType: "REAL" },
            ],
            rows: [
              { id: 1, first_name: "John", last_name: "Doe", salary: 50000 },
              { id: 2, first_name: "Jane", last_name: "Smith", salary: 60000 },
              { id: 3, first_name: "Bob", last_name: "Wilson", salary: 55000 },
            ],
          },
        ],

        expectedOutput: {
          type: "table",
          value: [],
        },
      },
      
      // Assignment 2
      
      {
        title: "Join employees and departments",
        difficulty: "Medium",
        question:
          "Show employee full name and their department name using JOIN.",

        sampleTables: [
          {
            tableName: "employees",
            columns: [
              { columnName: "id", dataType: "INTEGER" },
              { columnName: "first_name", dataType: "TEXT" },
              { columnName: "last_name", dataType: "TEXT" },
              { columnName: "department_id", dataType: "INTEGER" },
            ],
            rows: [
              { id: 1, first_name: "John", last_name: "Doe", department_id: 1 },
              { id: 2, first_name: "Jane", last_name: "Smith", department_id: 2 },
            ],
          },
          {
            tableName: "departments",
            columns: [
              { columnName: "id", dataType: "INTEGER" },
              { columnName: "name", dataType: "TEXT" },
            ],
            rows: [
              { id: 1, name: "Engineering" },
              { id: 2, name: "Sales" },
            ],
          },
        ],

        expectedOutput: {
          type: "table",
          value: [],
        },
      },

      
      // Assignment 3
      
      {
        title: "Count employees per department",
        difficulty: "Medium",
        question:
          "Show each department name and number of employees using GROUP BY.",

        sampleTables: [
          {
            tableName: "employees",
            columns: [
              { columnName: "id", dataType: "INTEGER" },
              { columnName: "department_id", dataType: "INTEGER" },
            ],
            rows: [
              { id: 1, department_id: 1 },
              { id: 2, department_id: 1 },
              { id: 3, department_id: 2 },
            ],
          },
          {
            tableName: "departments",
            columns: [
              { columnName: "id", dataType: "INTEGER" },
              { columnName: "name", dataType: "TEXT" },
            ],
            rows: [
              { id: 1, name: "Engineering" },
              { id: 2, name: "Sales" },
            ],
          },
        ],

        expectedOutput: {
          type: "table",
          value: [],
        },
      },
    ];

    
    await Assignment.insertMany(sampleAssignments);

   

  } catch (error) {
    console.log(" Error ", error.message);
  }
}


export default connectMongo;

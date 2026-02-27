import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";
import { findAssignmentByIdOrIndex } from "../utils/assignmentUtils.js";



function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}




export const getAllAssignments = async (req, res) => {

  if (!isMongoConnected()) {
    return res.status(503).json({
      message: "Database not connected"
    });
  }

  try {
    
    const assignments = await Assignment.find().sort({ createdAt: 1 });

    
    const result = assignments.map((item, index) => ({
      id: index + 1,               // Simple numeric id
      mongoId: item._id,           // Real MongoDB id
      title: item.title,
      difficulty: item.description,
      question: item.question
    }));

    res.json(result);

  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};




// Get Single Assignment (by id or index)


export const getAssignmentById = async (req, res) => {

  if (!isMongoConnected()) {
    return res.status(503).json({
      message: "Database not connected"
    });
  }

  try {
    const { id } = req.params;

    const assignment = await findAssignmentByIdOrIndex(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.json({
      id: assignment._id,
      title: assignment.title,
      difficulty: assignment.description,
      question: assignment.question,
      sampleTables: assignment.sampleTables,
      expectedOutput: assignment.expectedOutput
    });

  } catch (error) {
    console.error("Error :", error.message);
    res.status(500).json({
      message: "Something went wrong "
    });
  }
};

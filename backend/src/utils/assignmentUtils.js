import Assignment from "../models/Assignment.js";

export async function findAssignmentByIdOrIndex(id) {
  if (!id) return null;

  const value = String(id).trim();
  const num = Number(value);

  // If the id looks like a number (1, 2, 3...)
  if (!isNaN(num) && num > 0) {
    const assignments = await Assignment.find().sort({ createdAt: 1 });
    return assignments[num - 1] || null;
  }

  // Otherwise treat it as MongoDB _id
  return await Assignment.findById(value);
}

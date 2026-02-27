 
import axios from "axios";

// Create API connection
const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export function getAssignments() {
  return api.get("/assignments");
}

export function getAssignment(assignmentId) {
  return api.get("/assignments/" + assignmentId);
}

export function getSampleData(assignmentId) {
  return api.get("/assignment/" + assignmentId + "/sample");
}

export function executeQuery(sqlQuery) {
  return api.post("/query/execute", {
    sqlQuery: sqlQuery
  });
}

// Alias used by AttemptPage
export function runQuery(sqlQuery) {
  return executeQuery(sqlQuery);
}


export function getHint(questionText, userQuerySoFar) {
  return api.post("/query/hint", {
    questionText: questionText,
    userQuerySoFar: userQuerySoFar
  });
}
  
 
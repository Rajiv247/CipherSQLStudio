 
import { useEffect, useState } from "react";
import { getAssignments } from "../services/api";
import AssignmentCard from "../components/AssignmentCard";
import "../styles/AssignmentListPage.scss";

 const AssignmentListPage = () => {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Run when page loads
  useEffect(() => {

    async function fetchData() {
      try {
        const response = await getAssignments();
        setAssignments(response.data);
      } catch (err) {
        let msg = err.response?.data?.message || err.message || "Failed to load assignments";
        if (!err.response && (err.code === "ERR_NETWORK" || err.message?.includes("Network"))) {
          msg = "Could not reach server. Make sure the backend is running on port 3000 (run 'npm start' in the backend folder).";
        }
        setError(msg);
      }

      setLoading(false);
    }

    fetchData();

  }, []);

  // If loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If error
  if (error) {
    return <div>{error}</div>;
  }

  // Show assignments
  return (
    <div className="assignment-list">
      <h1 className="assignment-list__title">SQL Assignments</h1>

      <div className="assignment-list__cards">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

 export default AssignmentListPage;
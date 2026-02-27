import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignmentListPage from "./pages/AssignmentListPage";
import AttemptPage from "./pages/AttemptPage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AssignmentListPage />} />
          <Route path="/attempt/:id" element={<AttemptPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;

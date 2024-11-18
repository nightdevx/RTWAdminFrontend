import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/Admin_Login";
import AdminPage from "./pages/Admin_Page";
import ManageQuestionPackage from "./pages/ManageQuestionPackage";
import InterviewList from "./pages/InterviewList";
import EditPackage from "./pages/EditPackage";
import InterviewVideoCollection from "./pages/Interview_Video_Collection";
import InterviewCandidateVideoCollection from "./pages/Interview_Candidate_Video";
import NotFoundPage from "./pages/Not_Found_Page"; // 404 sayfasını import edin
import PrivateRoutes from "./routes/PrivateRoutes"; // Import the PrivateRoutes component
import Users from "./pages/Users";
import ManageMailsPage from "./pages/Manage_Mails_Page";
import MailsPage from "./pages/Mails_Page";
import MasterRoutes from "./routes/MasterRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-login" />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoutes>
              <Routes>
                <Route path="" element={<AdminPage />}>
                  <Route path="packages" element={<ManageQuestionPackage />} />
                  <Route
                    path="packages/questions/:id"
                    element={<EditPackage />}
                  />
                  <Route path="interview/list" element={<InterviewList />} />
                  <Route
                    path="interview/video-collection/:id"
                    element={<InterviewVideoCollection />}
                  />
                  <Route
                    path="interview/candidate-video/:id"
                    element={<InterviewCandidateVideoCollection />}
                  />
                  <Route path="manage-mails" element={<ManageMailsPage />} />
                  <Route path="manage-mails/:id?" element={<MailsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </PrivateRoutes>
          }
        />
        <Route
          path="/master/*"
          element={
            <MasterRoutes>
              <Routes>
                <Route path="/" element={<AdminPage />}>
                  <Route path="users" element={<Users />} />
                </Route>
              </Routes>
            </MasterRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} /> {/* Wildcard route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

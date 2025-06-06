import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Hompage";
import CharacterPage from "./pages/CharacterPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/characters/:name" element={<CharacterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

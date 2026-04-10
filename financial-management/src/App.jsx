import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Modules from './pages/Modules';
import About from './pages/About';
import TVMPage from './pages/tvm/TVMPage';
import CostOfCapitalPage from './pages/cost-of-capital/CostOfCapitalPage';
import LeveragePage from './pages/leverage/LeveragePage';
import CapitalStructurePage from './pages/capital-structure/CapitalStructurePage';
import CapitalBudgetingPage from './pages/capital-budgeting/CapitalBudgetingPage';
import DividendDecisionsPage from './pages/dividend-decisions/DividendDecisionsPage';
import StudyMaterials from './pages/StudyMaterials';
import VideoCourse from './pages/VideoCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/about" element={<About />} />
          <Route path="/modules/tvm" element={<TVMPage />} />
          <Route path="/modules/tvm/calculator" element={<TVMPage />} />
          <Route path="/modules/cost-of-capital" element={<CostOfCapitalPage />} />
          <Route path="/modules/leverage" element={<LeveragePage />} />
          <Route path="/modules/capital-structure" element={<CapitalStructurePage />} />
          <Route path="/modules/capital-budgeting" element={<CapitalBudgetingPage />} />
          <Route path="/modules/dividend-decisions" element={<DividendDecisionsPage />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/video-course" element={<VideoCourse />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

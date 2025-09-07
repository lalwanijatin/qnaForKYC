import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Ask_Question from './components/Ask_Question';
import CommentsList from './components/CommentList';
import Login from './components/Login';
import CreatorDashboard from './components/CreatorDashboard';
import RegisterUPI from './components/RegisterUPI';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TermsAndConditions from './components/TermsAndConditions';
import Help from './components/Help';

// tenp
import ExpertPage from './components/ExpertPage';

function App() {
  return (
    /* Temp  */
    <BrowserRouter basename="/askme">

<Navbar />

  
      <Routes>
        <Route path="/:creator_username" element={<Ask_Question />} />
        <Route path="/comments" element={<CommentsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerupi" element={<RegisterUPI />} />
        <Route path="/creator" element={<CreatorDashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/help" element={<TermsAndConditions />} />

        {/* temp */}
      <Route path="/expert/:id" element={<ExpertPage />} />
      </Routes>
      
      <Help/>
    </BrowserRouter>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateCommunity from './pages/CreateCommunity.jsx';
import CommunityDetailPage from './pages/CommunityDetailPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/communities" element={<Home />} />
        <Route path="/communities/new" element={<CreateCommunity />} />
        <Route path="/communities/:id" element={<CommunityDetailPage />} />
      </Routes>
    </div>
  );
}
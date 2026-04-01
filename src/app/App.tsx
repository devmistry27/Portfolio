import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Home } from '../pages/Home';
import { ProjectDetail } from '../pages/ProjectDetail';
import { SmoothScroll } from '../components/layout/SmoothScroll';
import { CustomCursor } from '../components/common/CustomCursor';

const App: React.FC = () => {
  return (
    <Router>
      <SmoothScroll>
        <div className="flex flex-col min-h-screen">
          <CustomCursor />
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;

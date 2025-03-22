import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Tree from './pages/Tree';
import Result from './pages/Result';
import Decorate from './pages/Decorate';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/decorate/:id" element={<Decorate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

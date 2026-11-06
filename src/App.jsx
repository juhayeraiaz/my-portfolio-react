import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// The admin tool is only used locally, so keep it out of the main bundle.
const AddProject = lazy(() => import('./pages/AddProject'));
// Case studies load on demand, keeping the home page bundle lean.
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/addprojects" element={<AddProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
}

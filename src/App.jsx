import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// The admin tool is only used locally, so keep it out of the main bundle.
const AddProject = lazy(() => import('./pages/AddProject'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addprojects" element={<AddProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
}

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DesignDetailPage1 from "./designWorks/DesignDetailPage1";

import DesignImageViewer from "./designWorks/DesignImageViewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design/detail-1" element={<DesignDetailPage1 />} />
      <Route path="/design/view/:id" element={<DesignImageViewer />} />
    </Routes>
  );
}

export default App;
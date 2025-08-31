import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Labs } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/labs" element={<Labs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

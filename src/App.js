import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

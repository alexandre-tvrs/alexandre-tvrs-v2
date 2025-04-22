import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import MyLovePage from "./pages/my_love";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<MyLovePage />} path="/dd437b90-cee2-4d49-9a2e-13ce0ead9ca7" />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { GreetingCard } from "./GreetingCard";

import { NotFound } from "./NotFound";
import { Home } from "./Home";
const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/greet/:username" element={<GreetingCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

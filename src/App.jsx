import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";
import Configurator from "./Pages/Configurator";
import MainMenu from "./Pages/MainMenu";
import Aftermath from "./Pages/Aftermath";
import Simulation from "./Pages/Simulation";

const App = () => {
  return <Routes>
    <Route path="/" element={<MainMenu />} />
    <Route path="/configure" element={<Configurator />} />
    <Route path="/aftermath" element={<Aftermath />} />
    <Route path="/about" element={<About />} />
    <Route path="/configure/deflect" element={<Simulation />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
};

export default App;

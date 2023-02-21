import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import RotateDevice from "./RotateDevice";
import Scan from "./Scan";

const App = () => {
  const isLandscape = () =>
      window.matchMedia("(orientation:landscape)").matches,
    [orientation, setOrientation] = useState(
      isLandscape() ? "landscape" : "portrait"
    );
  const onWindowResize = useCallback(() => {
    clearTimeout(window.resizeLag);
    window.resizeLag = setTimeout(() => {
      delete window.resizeLag;
      setOrientation(isLandscape() ? "landscape" : "portrait");
    }, 200);
  }, []);

  useEffect(() => {
    onWindowResize();
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [onWindowResize]);

  if (orientation === "landscape") {
    return <RotateDevice />;
  } else
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="scan" element={<Scan />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
};
export default App;

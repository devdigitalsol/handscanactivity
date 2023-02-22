import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import RotateDevice from "./RotateDevice";
import Scan from "./Scan";
import device from "current-device";

const App = () => {
  const [isIpad, setIsIpad] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (!device.portrait()) {
        setIsIpad(true);
      } else {
        setIsIpad(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isIpad) {
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

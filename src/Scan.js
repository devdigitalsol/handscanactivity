import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import oasislogoSmall from "./assets/oasislogoSmall.png";
import blankHand from "./assets/blankHand.png";
import fillHand from "./assets/fillHand.png";
import { Context } from "./context";
import axios from "axios";
import scanSound from "./assets/scan.mp3";
const Scan = () => {
  let scanAudio = new Audio(scanSound);
  scanAudio.loop = true;
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const { user } = useContext(Context);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [scanDone, setScanDone] = useState(false);
  let scanRef = useRef(null);
  let handAreaRef = useRef(null);
  const handleTouchStart = (e) => {
    if (e.targetTouches.length > 4) {
      handAreaRef.current.classList.add("disable");
      scanRef.current.classList.add("animate");
      scanAudio.play();
      axios
        .post("https://oasis.solmc.in/insert.php", user)
        .then((response) => {
          console.log(response.data.length);
          if (response.data.length) {
            setCount(response.data.length);
            setTimeout(() => {
              setScanDone(true);
              scanRef.current.classList.remove("animate");
              scanAudio.pause();
            }, 4000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="screen scan-screen">
      <div className="oasislogoSmall">
        <img src={oasislogoSmall} alt="logo" />
      </div>
      <div
        className="handArea"
        ref={handAreaRef}
        onTouchStart={handleTouchStart}
      >
        {scanDone && <div className="totalCount">{count}</div>}
        {!scanDone ? (
          <img src={blankHand} alt="hand" />
        ) : (
          <img src={fillHand} alt="hand" className="fillHand" />
        )}
      </div>
      {scanDone && (
        <button
          type="button"
          className="btn"
          onClick={() => window.location.reload()}
        >
          Reset
        </button>
      )}
      <div className="scanner" ref={scanRef}></div>
    </div>
  );
};
export default Scan;

import oasislogo from "./assets/oasislogo.png";
import hometext1 from "./assets/hometext1.png";
import hometext2 from "./assets/hometext2.png";
import { useNavigate } from "react-router-dom";
import clickSound from "./assets/click.mp3";
const Home = () => {
  const navigate = useNavigate();
  let audio = new Audio(clickSound);
  const goNext = () => {
    audio.play();
    navigate("/login");
  };
  return (
    <div className="screen intro-screen">
      <div className="homeLogos">
        <img src={oasislogo} alt="oasislogo" />
        <img src={hometext1} alt="hometext1" />
      </div>
      <div className="intro-bottom">
        <img src={hometext2} alt="hometext2" />
        <button onClick={goNext} className="btn">
          JOIN
        </button>
      </div>
    </div>
  );
};
export default Home;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import oasislogo from "./assets/oasislogo.png";
import { Context } from "./context";
import clickSound from "./assets/click.mp3";
const Login = () => {
  let audio = new Audio(clickSound);
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  useEffect(() => {
    if (user) {
      navigate("/scan");
    }
  }, [user, navigate]);
  const initialState = {
    name: "",
    place: "",
    email: "",
    mobile: "",
  };
  const [userInfo, setUserInfo] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cansave) {
      toast.error("Please fill all the required fields.");
      return false;
    }
    // eslint-disable-next-line
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(userInfo.email) === false) {
      toast.error("Invalid Email Address");
      return false;
    }

    // console.log(userInfo);
    audio.play();
    setUser(userInfo);
  };
  const cansave = [
    userInfo?.name.trim(),
    userInfo?.place.trim(),
    userInfo?.email.trim(),
  ].every(Boolean);
  return (
    <div className="screen login-screen">
      <div className="homeLogos">
        <img src={oasislogo} alt="oasislogo" />
      </div>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group required">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>
        <div className="form-group required">
          <input
            type="text"
            className="form-control"
            placeholder="Place"
            value={userInfo.place}
            onChange={(e) =>
              setUserInfo({ ...userInfo, place: e.target.value })
            }
          />
        </div>
        <div className="form-group required">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            value={userInfo.mobile}
            onChange={(e) =>
              setUserInfo({ ...userInfo, mobile: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
        <span className="mandatoryText">* Mandatory fields</span>
      </form>
    </div>
  );
};
export default Login;

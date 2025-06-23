import { NavLink } from "react-router-dom";
import "./welcome.css";
import FeedStart from "../../components/feedforstart/FeedStart";

export default function Welcome() {
  const username = "mrare123";
  return (
    <div className="container">
      <div
        className="postPage"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <img src="/assets/logo.png" alt="Logo" className="logo-image" />
        <FeedStart username={username} />
      </div>
      <div className="loginRegister">
        <div className="login-button-container">
          <h1 className="welcometext_first">Welcome to <span style={{ color: '#ff911c' }}>ETGRAM</span></h1>
          <h2 className="welcometext_second">
            <span style={{ color: '#ff911c' }}>ETGRAM</span> helps you connect and share with the people in your life
          </h2>
        </div>
        <NavLink to="/login">
          <button className="loginbutton">Login</button>
        </NavLink>
        <NavLink to="/register">
          <button className="registerbutton">Register</button>
        </NavLink>
        <p className="terms-text">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
      </div>
    </div>
  );
}

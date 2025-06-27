import "./register.css";
import { useRef, useState } from "react";
import { registerCall } from "../../apiCalls";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const yearRef = useRef();

  const [errors, setErrors] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    if(passwordAgainRef.current.value !== passwordRef.current.value){
      setErrors({confirmPassword: "Passwords don't match!"});
      return;
    }
    else{
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        displayName: firstNameRef.current.value + " " + lastNameRef.current.value,
        dateOfBirth: new Date(yearRef.current.value, monthRef.current.value - 1, dayRef.current.value),
      };
      try{
        await axios.post("/auth/register", user);
        navigate("/login");
      }
      catch(err){
        console.log(err);
        setErrors({general: "Registration failed. Please try again."});
      }
    }
  }

  const handleLoginRedirect = () => {
    navigate("/login");
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerHeader">
          <h1 className="registerLogo">ET-GRAM</h1>
          <span className="registerDesc">
            Social Network for KMITL-SIET.BTECH students
          </span>
        </div>
        
        <form className="RegisterBox" onSubmit={handleClick}>
          <input 
            placeholder="Username" 
            required 
            ref={usernameRef} 
            className="RegisterInput" 
          />
          
          <input 
            placeholder="Email" 
            type="email" 
            required 
            ref={emailRef} 
            className="RegisterInput" 
          />
          
          <input 
            placeholder="Password" 
            type="password" 
            required 
            minLength="6" 
            ref={passwordRef} 
            className="RegisterInput" 
          />
          
          <input 
            placeholder="Confirm password" 
            type="password" 
            required 
            minLength="6" 
            ref={passwordAgainRef} 
            className={`RegisterInput ${errors.confirmPassword ? 'error' : ''}`}
          />
          {errors.confirmPassword && (
            <span className="errorMessage">
              {errors.confirmPassword}
            </span>
          )}

          <div className="inputWrapper">
            <input 
              placeholder="Name"
              type="text" 
              ref={firstNameRef} 
              required 
              className="RegisterInputs"
            />
            <input 
              placeholder="Last Name"
              type="text"  
              ref={lastNameRef} 
              required 
              className="RegisterInputs" 
            />
          </div>

          <div className="dateLabel">Date of birth</div>
          
          <div className="inputWrapper">
            <select ref={monthRef} required className="Inputmonth">
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            
            <select ref={dayRef} required className="InputDY">
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            
            <select ref={yearRef} required className="InputDY">
              <option value="">Year</option>
              {Array.from({ length: 65 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {errors.general && (
            <div className="generalError">
              {errors.general}
            </div>
          )}

          <button className="registerButton" type="submit">Next</button>
          
          <div className="backToLogin">
            <Link to="/login" className="registerBackButton">
              Back to log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
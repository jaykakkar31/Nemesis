import React,{useState} from "react";
function Login(props){

const [loginDetails, setLoginDetails] = useState({
  email: "",
  password: "",
});

 function handleChange(event) {
   const { name, value } = event.target;
   setLoginDetails((prevValue) => {
     return {
       ...prevValue,
       [name]: value,
     };
   });
 
 }

    function handleSubmit(event) {
      event.preventDefault();
      console.log(loginDetails);
      props.signIn(loginDetails)
       setLoginDetails({
         email: "",
         password: "",
       });
    }
    return (
      <div className="white-panel">
        <div className="login-show">
          <div className="login-heading">
            <h2>LOGIN</h2>
          </div>
          <div className="form">
            <form>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={loginDetails.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                value={loginDetails.password}
                type="password"
                name="password"
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login
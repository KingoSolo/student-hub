import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Spinner state
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function logInNow() {
    console.log(email);
    console.log(password);

    const loginPayload = {
      email: email,
      password: password,
    };

    try {
      setLoading(true); // Start spinner
      const res = await axios.post(
        'http://localhost:3000/api/students/login',
        loginPayload
      );
      console.log("response: ", res);

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        // Save user info
        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
        console.log(token);
        console.log("successful login");

        toast.success("Login successful!");
        setTimeout(() => {
          navigate('/dashboard'); // Navigate after showing the toast
        }, 2000);
      }
    } catch (err) {
      console.log("An error occurred");
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Stop spinner
    }
  }

  return (
    <div>
      {/* Toast container */}
      <ToastContainer />
      <form className="bg-white rounded-lg p-6 mx-auto max-w-lg mt-[10%] shadow-md border border-gray-100">
        <p className="font-montserrat text-4xl mt-[5%] flex justify-center font-extrabold">
          Welcome back
        </p>

        <div className="flex flex-col ml-[12%] w-[350px] space-y-10 justify-center">
          <input
            type="text"
            placeholder="Email"
            autoComplete='email'
            className="mt-10 rounded-md w-[350px] sm:w-[3xl] p-1 px-2 bg-[#EEEEEE] border border-gray-500 focus:outline-none"
            onChange={handleEmail}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="rounded-md w-[350px] sm:w-[3xl] p-1 px-2 bg-[#EEEEEE] border border-gray-500 focus:outline-none"
            onChange={handlePassword}
          />
        </div>

        <div className="mt-[6%]">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={logInNow}
              className="bg-blue-600 rounded-md w-[350px] p-2 text-white hover:bg-blue-900 transition-all duration-200 flex items-center justify-center"
              disabled={loading} // Disable button during loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="mt-4 text-center">
            Do not have an account?{" "}
            <Link to="/signup" className="text-[#2171d8]">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

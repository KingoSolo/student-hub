import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Spinner state

  const navigate = useNavigate(); 

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  async function signUpNow() {
    setLoading(true); // Show spinner
    const signupPayload = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      const res = await axios.post(
        'https://student-hub-vd8o.onrender.com/api/students/register',
        signupPayload
      );

      if (res.status === 201) {
        toast.success('Sign up successful! 🎉'); 
        setTimeout(() => navigate('/login'), 2000); 
      }
    } catch (err) {
      toast.error('An error occurred during sign up. Please try again!'); // Error toast
    } finally {
      setLoading(false); // Hide spinner
    }
  }

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <form className="bg-white rounded-lg p-6 mx-auto max-w-lg mt-[3%] shadow-md border border-gray-100">
        <p className="font-montserrat text-4xl mt-[5%] flex justify-center font-extrabold">
          Welcome to Study Hub
        </p>

        <div className="flex flex-col mt-10 justify-center ml-[12%] w-[350px] space-y-8">
          <input
            type="text"
            placeholder="First Name"
            autoComplete='given-names'
            className="rounded-md w-[350px] sm:w-[3xl] p-1 px-2 bg-[#EEEEEE] border border-gray-500 focus:outline-none"
            onChange={handleFirstName}
          />
          <input
            type="text"
            placeholder="Last name"
            autoComplete='family-name'
            className="rounded-md w-[350px] sm:w-[3xl] p-1 px-2 bg-[#EEEEEE] border border-gray-500 focus:outline-none"
            onChange={handleLastName}
          />
          <input
            type="text"
            placeholder="Email"
            autoComplete='email'
            className="rounded-md w-[350px] sm:w-[3xl] p-1 px-2 bg-[#EEEEEE] border border-gray-500 focus:outline-none"
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete='new-password'
            className="rounded-md w-[350px] sm:w-[3xl] p-1 px-2 bg-[#EEEEEE] border border-gray-500 focus:outline-none"
            onChange={handlePassword}
          />
        </div>

        <div className="mt-[6%]">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={signUpNow}
              className="bg-blue-600 rounded-md w-[350px] p-2 text-white hover:bg-blue-900 transition-all duration-200"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Signing Up...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2171d8]">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

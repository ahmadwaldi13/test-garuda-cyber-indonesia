import React, { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
  const [showStatusPswrd, setShowStatusPswrd] = useState(false)

  const togglePassword = () => {
    setShowStatusPswrd(!showStatusPswrd)
  };


  // Data Form
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  // Data Form End

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const dataForm = {
          username,
          email,
          phone,
          password
        };
        await axios.post(`http://localhost:5000/api/v1/register`, dataForm)
        toast.success("Registration successful")
        setTimeout(() => {
          router.push("/login")
        }, 2000);
      } catch (error) {
        console.info(error)
        toast.error(error.response.data.errors)
      }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden font-quickSand">

      {/* Right */}
      <div className="bg-white flex flex-col justify-center p-10 lg:p-20 rounded-tl-[90px]">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Username Input */}
          <div className="relative w-full flex items-center">
            <img
              src="/person_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
          </div>
          {/* Username Input End*/}

          {/* Email Input */}
          <div className="relative w-full flex items-center">
            <img
              src="/email_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
          </div>
          {/* Email Input End*/}

          {/* Phone Input */}
          <div className="relative w-full flex items-center">
            <img
              src="/phone-call-svgrepo-com.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
          </div>
          {/* Phone Input End*/}

          {/* Password Input */}
          <div className="relative flex items-center">
            <img
              src="/password_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type={showStatusPswrd ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3"
            >
              <img
                src={
                  showStatusPswrd
                    ? "/show_password_off_icon.svg"
                    : "/show_password_icon.svg"
                }
                alt=""
                className="w-[20px] opacity-50"
              />
            </button>
          </div>
          {/* Password Input End */}

          {/* Button Submit */}
          <button
            type="submit"
            className="bg-dark py-3 rounded-xl text-white text-sm font-medium"
          >
            Register
          </button>
          {/* Button Submit End */}
        </form>

        <p className="self-center my-2 font-bold">Or</p>
        <p className="self-center mt-1 text-sm font-medium">
        Already have an account? {" "}
          <Link href="/login" className="underline font-bold text-primary">
          Enter here
          </Link>
        </p>
      </div>
      {/* Right End */}
      <ToastContainer />
    </div>
  );
};

export default Register;

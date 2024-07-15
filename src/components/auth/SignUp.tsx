import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiHide } from "react-icons/bi";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (response) => {
          const user = response.user;
          console.log(user);
        },
      );
      navigate("/login");
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="max-h-dvh w-screen flex flex-col px-6 pt-[76px] overflow-hidden">
      <div className="gap-2">
        <h1 className="text-[32px] font-semibold leading-10 text-black-1">
          Create your new account.
        </h1>
        <h5 className="text-gray-1">
          Create an account to start looking for the food you like
        </h5>
      </div>

      {/* handleSignUp */}
      <form
        onSubmit={handleSignup}
        className="pt-3 text-sm flex flex-col gap-6"
      >
        <div className="flex flex-col gap-[14px] font-medium">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-[#EDEDED] valid:border-[#D6D6D6] outline-none placeholder:text-gray-1 rounded-lg p-4"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="border border-[#EDEDED] valid:border-[#D6D6D6] outline-none placeholder:text-gray-1 rounded-lg p-4"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <div className="flex items-center justify-between border border-[#EDEDED] group rounded-lg p-4 has-[:valid]:border-[#D6D6D6]">
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="outline-none w-full placeholder:text-gray-1 valid"
              />

              <BiHide
                size={20}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="w-full gap-2 flex">
            <input
              type="checkbox"
              className="border border-gray-1 accent-primary h-5 w-5 rounded"
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <span className="text-black-1 font-medium">
              I Agree with{" "}
              <span className="text-primary font-medium">
                Terms of Service{" "}
              </span>
              and{" "}
              <span className="text-primary font-medium">Privacy Policy</span>
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={checked ? false : true}
          className="bg-primary py-4 rounded-full font-semibold text-white disabled:opacity-50 transition-all duration-300"
          onClick={handleSignup}
        >
          Register
        </button>
        <div className="flex items-center justify-between gap-4">
          <div className="bg-gray-1 h-[0.5px] w-full" />
          <span className="whitespace-nowrap text-gray-1">Or sign in with</span>
          <div className="bg-gray-1 h-[0.5px] w-full" />
        </div>

        {/* handleGoogleLogin */}
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => {}}
            className="border border-[#D6D6D6] rounded-full w-fit flex items-center justify-center p-2"
          >
            <FcGoogle
              size={24}
              className=""
            />
          </button>
        </div>
      </form>

      <div className="pt-[30px] pb-[36px] text-black-1 w-full flex items-baseline justify-center gap-1">
        <span className="text-black-1 font-sans font-medium">
          Have an account?
        </span>
        <Link
          to="/login"
          className="text-primary font-semibold"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

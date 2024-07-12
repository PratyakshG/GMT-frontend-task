import { FormEvent, useState } from "react";
import { BiHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/onboarding_image_1.png";
import successImage from "../../assets/successImage.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoginComplete, setIsLoginComplete] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        handleLoginComplete();
      })
      .catch((error) => {
        console.error("Error logging in: ", error);
      });
  };

  const handleGoogleLogin = (e: FormEvent) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        handleLoginComplete();
      })
      .catch((error) => {
        console.error("Error logging in with Google: ", error);
      });
  };

  // funtion to set the login to true after the login is complete
  const handleLoginComplete = () => {
    setIsLoginComplete(true);
  };

  // funtion to navigate to home page after login is complete
  const navigateToHome = () => {
    navigate("/home", { replace: true });
    setIsLoginComplete(false);
  };

  const Logout = () => {
    signOut(auth);
    setIsLoginComplete(false);
  };

  return (
    <div
      style={{
        backgroundImage: isLoginComplete ? `url(${backgroundImage})` : "none",
      }}
      className="h-screen w-screen bg-cover bg-center flex items-end"
    >
      {isLoginComplete ? (
        <div className="h-fit w-full flex flex-col items-center justify-center bg-white px-8 rounded-t-3xl gap-8">
          <div className="h-1 w-[58px] bg-[#00000020] my-[10px]" />
          <img
            src={successImage}
            alt="login Success Image"
          />
          <h5 className="text-2xl font-semibold">Login Complete</h5>
          <div className="flex flex-col gap-[22px] w-full">
            <button
              onClick={navigateToHome}
              className="w-full bg-primary py-4 rounded-full font-semibold text-white text-sm"
            >
              Go to Tracking Screen
            </button>
            <button
              onClick={Logout}
              className="text-sm text-gray-1 pb-[78px]"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex flex-col px-6 pt-[76px]">
          <div className="gap-2">
            <h1 className="text-[32px] font-semibold leading-10 text-black-1">
              Login to you account.
            </h1>
            <h5 className="text-gray-1">Please sign in to your account</h5>
          </div>

          {/* handleLogin */}
          <form
            onSubmit={handleLogin}
            className="pt-8 text-sm flex flex-col gap-6"
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
            </div>

            <div className="w-full text-right">
              <span className="text-primary font-medium">Forgot Password?</span>
            </div>

            <button
              type="submit"
              className="bg-primary py-4 rounded-full font-semibold text-white"
            >
              Sign In
            </button>
            <div className="flex items-center justify-between gap-4">
              <div className="bg-gray-1 h-[0.5px] w-full" />
              <span className="whitespace-nowrap text-gray-1">
                Or sign in with
              </span>
              <div className="bg-gray-1 h-[0.5px] w-full" />
            </div>

            {/* handleGoogleLogin */}
            <div className="w-full flex items-center justify-center">
              <button
                onClick={handleGoogleLogin}
                className="border border-[#D6D6D6] rounded-full w-fit flex items-center justify-center p-2"
              >
                <FcGoogle
                  size={24}
                  className=""
                />
              </button>
            </div>
          </form>

          <div className="pt-8 text-black-1 w-full flex items-baseline justify-center gap-1">
            <span className="text-black-1 font-sans font-medium">
              Don't have an account?
            </span>
            <Link
              to="/signup"
              className="text-primary font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

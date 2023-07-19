import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/googleLogo.svg";
import filterPixelLogo from "../assets/filterPixelLogo.svg";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, googleSignIn } = useUserAuth();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //   setLoading(false);
      return;
    }

    try {
      await logIn(email, password);
      toast({
        title: "Logged In Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/home");
    } catch (err) {
      toast({
        title: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //   setLoading(false);
      return;
    }
  };

  const googleSignInHandler = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn();
      toast({
        title: "Logged In Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/home");
    } catch (err) {
      toast({
        title: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //   setLoading(false);
      return;
    }
  };

  const passwordEyeToggler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen  space-y-3 bg-[#1B1B1B] ">
      <header className="flex justify-between align-middle p-4 ">
        <div className="flex gap-2 align-middle justify-center">
          <img src={filterPixelLogo} alt="" />
          <div className="my-auto text-white">FilterPixel</div>
        </div>

        <Link
          to="/signup"
          className="flex h-fit p-2 bg-white text-center rounded-lg hover:scale-110 duration-200"
        >
          Sign Up
        </Link>
      </header>

      <section className=" p-4 flex flex-col m-auto w-fit  min-w-[20rem] max-w-[80vw]">
        <form onSubmit={onSubmitHandler} className=" pt-8 space-y-5">
          <div
            className="flex align-middle justify-center gap-4 bg-[#C95252] hover:bg-[#d44949] duration-200 hover:scale-105 p-2 rounded-lg  cursor-pointer"
            onClick={googleSignInHandler}
          >
            <div className="bg-white rounded-full">
              <img src={googleLogo} className="h-8" />
            </div>
            <div className="my-auto text-white">Login with google</div>
          </div>
          <div className="grid grid-cols-7 align-middle my-auto">
            <div className="border h-0 col-span-3"></div>
            <div className="px-2 text-white">OR</div>
            <div className="border h-0 col-span-3"></div>
          </div>
          <div className="px-4 py-2 border bg-white border-gray-400 rounded-lg">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-4 py-2 bg-white  border border-gray-400 rounded-lg flex justify-between">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!showPassword ? (
              <BsFillEyeFill
                className="place-self-center"
                onClick={passwordEyeToggler}
              />
            ) : (
              <BsFillEyeSlashFill
                className="place-self-center"
                onClick={passwordEyeToggler}
              />
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-500  "
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;

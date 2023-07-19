import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useUserAuth } from "../context/UserAuthContextProvider";
import { useNavigate } from "react-router-dom";
import filterPixelLogo from "../assets/filterPixelLogo.svg";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const { signUp } = useUserAuth();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password1 || !password2) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password1 !== password2) {
      toast({
        title: "Both Passwords Fields Should Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      await signUp(email, password1);
      toast({
        title: "Signed up Successfully , Now Log In",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
          to="/"
          className="flex h-fit p-2 bg-white text-center rounded-lg hover:scale-110 duration-200"
        >
          Login
        </Link>
      </header>

      <section className=" p-4 flex flex-col m-auto w-fit min-w-[20rem]  max-w-[80vw]">
        <div className="text-center text-4xl text-white">Sign Up</div>
        <form onSubmit={onSubmitHandler} className=" pt-8 space-y-5">
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
              onChange={(e) => setPassword1(e.target.value)}
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
          <div className="px-4 py-2 bg-white  border border-gray-400 rounded-lg flex justify-between">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Confirm Password"
              className="outline-none"
              onChange={(e) => setPassword2(e.target.value)}
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

export default SignUp;

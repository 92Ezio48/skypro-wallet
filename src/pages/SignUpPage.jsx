import { useContext } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const SignUpPage = () => {
  const { updateUserInfo } = useContext(AuthContext);
  return <AuthForm updateUserInfo={updateUserInfo} isSignUp={true} />;
};

export default SignUpPage;

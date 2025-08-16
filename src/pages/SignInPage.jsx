import { useContext } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const SignInPage = () => {
  const { updateUserInfo } = useContext(AuthContext);
  return <AuthForm updateUserInfo={updateUserInfo} isSignUp={false} />;
};

export default SignInPage;

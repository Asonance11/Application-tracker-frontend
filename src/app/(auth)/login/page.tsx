import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;

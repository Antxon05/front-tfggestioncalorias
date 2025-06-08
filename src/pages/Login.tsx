import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import LoginForm from "../components/layout/LoginForm";
import Navbar from "../components/layout/Navbar";

function Login() {
  return (
    <>
      <Navbar />
      <AnimatedPageWrapper>
        <LoginForm></LoginForm>
      </AnimatedPageWrapper>
    </>
  );
}

export default Login;

import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import LoginForm from "../components/form/LoginForm";
import Navbar from "../components/navbar/Navbar";

//Página para loguearse
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

import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import Navbar from "../components/layout/Navbar";
import RegistryForm from "../components/layout/RegistryForm";

function Register() {
  return (
    <>
      <Navbar />
      <AnimatedPageWrapper>
        <RegistryForm></RegistryForm>
      </AnimatedPageWrapper>
    </>
  );
}

export default Register;

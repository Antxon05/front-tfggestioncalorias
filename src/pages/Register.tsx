import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import Navbar from "../components/navbar/Navbar";
import RegistryForm from "../components/form/RegistryForm";

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

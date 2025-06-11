import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import Navbar from "../components/navbar/Navbar";
import RegistryForm from "../components/form/RegistryForm";

//Página para realizar el registro
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

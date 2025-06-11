import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import CreateProfileForm from "../components/form/CreateProfileForm";
import Navbar from "../components/navbar/Navbar";

//Página de crear perfil
function CreateProfile() {
  return (
    <>
      <Navbar />
      {/*Muestra la animación*/}
      <AnimatedPageWrapper>
        <CreateProfileForm></CreateProfileForm>
      </AnimatedPageWrapper>
    </>
  );
}

export default CreateProfile;

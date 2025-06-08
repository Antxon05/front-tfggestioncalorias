import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import CreateProfileForm from "../components/form/CreateProfileForm";
import Navbar from "../components/navbar/Navbar";

function CreateProfile() {
  return (
    <>
      <Navbar />
      <AnimatedPageWrapper>
        <CreateProfileForm></CreateProfileForm>
      </AnimatedPageWrapper>
    </>
  );
}

export default CreateProfile;

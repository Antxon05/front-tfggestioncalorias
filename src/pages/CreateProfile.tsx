import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import CreateProfileForm from "../components/layout/CreateProfileForm";
import Navbar from "../components/layout/Navbar";

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

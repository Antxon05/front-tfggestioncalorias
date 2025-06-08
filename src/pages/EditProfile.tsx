import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";
import EditProfileForm from "../components/form/EditProfileForm";

function EditProfile() {
  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <EditProfileForm />
      </div>
    </AnimatedPageWrapper>
  );
}

export default EditProfile;

import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import NextButton from "../components/ui/NextButton";

function TargetCalories() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Gracias por compartir tus datos!
      </h2>
      <h3 className="text-center mt-10 font-semibold italic">
        Tus calorías para cumplir tus objetivos són
      </h3>
      <div className="bg-white p-6 text-center rounded-xl w-full max-w-sm m-auto mt-10 shadow-md">
        <h1 className="font-bold text-3xl text-green-900">
          2253{" "}
          <span className="font-bold text-green-700 text-lg">kcal/día</span>
        </h1>
      </div>
      <div className="fixed bottom-0 right-0 mb-10 mr-10">
        <NextButton onClick={handleSubmit} />
      </div>
    </>
  );
}

export default TargetCalories;

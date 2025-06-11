import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import NextButton from "../components/ui/NextButton";
import { useEffect, useState } from "react";
import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";

//Página que muestra las calorias objetivo después de insertar tus datos
function TargetCalories() {
  const navigate = useNavigate();
  const [calories, setCalories] = useState<number | null>(null);

  //Obtiene el dailySummary creado, para obtener el goalCalories
  useEffect(() => {
    const fetchCalories = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:8080/api/dailysummary/today",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("No se pudieron obtener las calorías");
        }

        const data = await response.json();
        setCalories(data.goalCalories);
      } catch (error) {
        console.error("Error al obtener las calorías:", error);
      }
    };

    fetchCalories();
  }, []);

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <AnimatedPageWrapper>
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Gracias por compartir tus datos!
        </h2>
        <h3 className="text-center mt-10 font-semibold italic">
          Tus calorías para cumplir tus objetivos són
        </h3>
        <div className="bg-white p-6 text-center rounded-xl w-full max-w-sm m-auto mt-10 shadow-md">
          <h1 className="font-bold text-3xl text-green-900">
            {calories}{" "}
            <span className="font-bold text-green-700 text-lg">kcal/día</span>
          </h1>
        </div>
        <div className="fixed bottom-0 right-0 mb-10 mr-10">
          <NextButton onClick={handleSubmit} />
        </div>
      </AnimatedPageWrapper>
    </>
  );
}

export default TargetCalories;

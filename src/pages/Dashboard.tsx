import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import InfoCard from "../components/ui/InfoCard";
import RegisteredFoodTable from "../components/table/FoodRecordTable";
import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";

//Página principal
function Dashboard() {
  const [dailySummary, setDailySummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDailySummary = async () => {
    const token = localStorage.getItem("token");

    //Obtenemos información del usuario basado en el día actual (pasamos valores o función a otros componentes)
    try {
      const response = await fetch(
        `http://localhost:8080/api/dailysummary/today`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los alimentos");
      }

      const data = await response.json();
      setDailySummary(data);
    } catch (error) {
      console.error("Error al cargar alimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailySummary();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <>
      <AnimatedPageWrapper>
        <Navbar />
        <div className="mt-30 w-[90%] mx-auto px-4">
          <InfoCard
            title="Calorías Restantes"
            description="(kcal objetivo - kcal consumidas)"
            goal={dailySummary.goalCalories}
            consumed={dailySummary.consumedCalories}
          />

          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            <div className="w-full lg:w-3/4">
              <RegisteredFoodTable onReload={fetchDailySummary} />
            </div>

            <div className="w-full lg:w-1/5 flex flex-col gap-4">
              <InfoCard
                title="Proteínas Restantes"
                description="(prote. objetivo - prote. consumidas)"
                goal={dailySummary.goalProtein}
                consumed={dailySummary.consumedProtein}
              />
              <InfoCard
                title="Carbohidratos Restantes"
                description="(carbs. objetivo - carbs. consumidas)"
                goal={dailySummary.goalCarbohydrates}
                consumed={dailySummary.consumedCarbohydrates}
              />
              <InfoCard
                title="Grasas Restantes"
                description="(grasas objetivo - grasas consumidas)"
                goal={dailySummary.goalFats}
                consumed={dailySummary.consumedFats}
              />
            </div>
          </div>
        </div>
      </AnimatedPageWrapper>
    </>
  );
}

export default Dashboard;

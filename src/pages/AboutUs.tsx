import Navbar from "../components/layout/Navbar";
import H3 from "../components/ui/H3";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center mt-5 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <h1 className="text-3xl font-bold text-green-700 sm:text-4xl text-center mb-5">
          ¿Que es NutriDiary?
        </h1>
        <div className="flex flex-col flex-wrap m-10 md:flex-row md:flex-nowrap">
          <div className="m-10">
            <H3>¿Que és?</H3>
            <p>
              NutriDiary es una aplicación pensada para ayudarte a llevar un
              control inteligente y personalizado de tu alimentación diaria.
            </p>
            <br />
            <br />
            <H3>¿Como funciona?</H3>
            <p>
              Desde el primer momento, introduces tus datos físicos y tus
              objetivos (como perder grasa, ganar músculo o simplemente
              mantenerte en forma), y NutriDiary calcula automáticamente tus
              necesidades calóricas y macronutrientes diarios.
            </p>
          </div>
          <div className="m-10">
            <H3>¿Que puedes hacer?</H3>
            <p>
              Luego, puedes registrar tus comidas en un diario fácil de usar,
              donde cada alimento ya viene con su valor nutricional. Así, vas
              viendo en tiempo real si estás cumpliendo tus objetivos sin tener
              que contar calorías manualmente.
            </p>
            <br />
            <br />
            <H3>Objetivo de NutriDiary:</H3>
            <p>
              Ya sea que estés empezando a cuidarte o buscando afinar tu dieta,
              NutriDiary te acompaña para que tengas más claridad, constancia y
              control sobre tu nutrición.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default AboutUs;

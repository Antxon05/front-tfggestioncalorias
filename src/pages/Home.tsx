import logoremove from "../assets/logo-nutridiary-removebg-preview.png";
import Button from "../components/ui/Button";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AnimatedPageWrapper from "../animations/AnimatedPageWrapper";

const heading = "bienvenid@";

function Home() {
  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  return (
    <>
      <Navbar />
      <AnimatedPageWrapper>
        <div className="min-h-screen flex flex-wrap justify-evenly items-center p-4 text-green-700 font-poppins ">
          <div>
            <motion.h1
              className="flex text-4xl font-bold md:mb-25 md:text-7xl mt-10 gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{
                opacity: { duration: 1 },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              {heading.split("").map((char, index) => (
                <motion.span key={index} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <div className="items-center flex flex-col justify-center">
            <img src={logoremove} alt="" className="w-100" />

            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>

            <p className="mt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="inline-block text-green-600 underline transition-all duration-300 hover:text-green-800 hover:scale-105"
              >
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </AnimatedPageWrapper>
    </>
  );
}

export default Home;

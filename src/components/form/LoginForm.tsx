import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import login from "../../services/AuthService";
import Input from "../ui/Input";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //Cuando le damos a "login"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    //Hacemos fetch con los datos obtenidos en los state
    try {
      //Lamamos al servicio que esta aparte
      const data = await login(email, password);
      console.log("Respuesta del servidor: ", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center px-4 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Iniciar Sesión
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hasError={!!error}
            />
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hasError={!!error}
            />
          </div>

          <div className="flex justify-center m-5">
            <Button type="submit">Entrar</Button>
          </div>
          {error && (
            <p className="text-red-600 text-center mt-4 font-semibold">
              {error}
            </p>
          )}
          <Link
            to="/register"
            className="mt-3 text-center inline-block text-green-600 underline transition-all duration-300 hover:text-green-800 hover:scale-105"
          >
            ¿No tienes una cuenta creada?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

import { useState } from "react";
import Button from "../ui/Button";
import { Navigate, useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Correo o contraseña incorrectos");
      }

      const data = await response.json();
      console.log("Respuesta del servidor: ", data);

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.mesage || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center px-4 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Iniciar Sesión
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-400" : "focus:ring-green-400"
              }`}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`flex-1 px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-400" : "focus:ring-green-400"
              }`}
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
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

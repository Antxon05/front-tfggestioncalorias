import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";

function RegistryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //cargamos los datos de parteRegistro si hay
  useEffect(() => {
    const datosGuardados = sessionStorage.getItem("parteRegistro");
    if (datosGuardados) {
      const { name, email, password } = JSON.parse(datosGuardados);
      setName(name || "");
      setEmail(email || "");
      setPassword(password || "");
      setConfirmPassword(password || "");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    //Comprobaciones de valores
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("No son iguales las contraseñas.");
      return;
    }

    //LLamamos al servicio a parte y le pasamos los datos de los state
    try {
      const formData = { name, email, password };
      sessionStorage.setItem("parteRegistro", JSON.stringify(formData));
      navigate("/register/create-profile");
    } catch (error: any) {
      setError(error.message || "Error al registro de datos");
    }

    console.log(sessionStorage.getItem("parteRegistro"));
    console.log(error);
  };

  return (
    <div className="flex justify-center px-4 mt-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 mb-10 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Registrarse
        </h2>
        <div>
          <div className="flex flex-col">
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              autoComplete="name"
              hasError={!!error}
            />
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              autoComplete="email"
              hasError={!!error}
            />
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (mínimo 8 caracteres)"
              autoComplete="new-password"
              hasError={!!error}
            />
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la contraseña"
              autoComplete="new-password"
              hasError={!!error}
            />
          </div>
          <div className="flex flex-col justify-center m-5">
            <Button type="submit">Registrarse</Button>
            {error && (
              <p className="text-red-600 text-center mt-4 font-semibold">
                {error}
              </p>
            )}
            <Link
              to="/login"
              className="mt-5 text-center inline-block text-green-600 underline transition-all duration-300 hover:text-green-800 hover:scale-105"
            >
              ¿Ya tienes una cuenta creada?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistryForm;

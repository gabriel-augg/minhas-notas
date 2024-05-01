import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router-dom";
import Input from "../components/Input";
import { Loginchema } from "../utils/schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Loginchema),
  });

  const { signIn } = useContext(UserContext);

  const handleOnSubmit = async (user) => {
    await signIn(user);
  };

  return (
    <section className="h-screen w-full flex item-center justify-center">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-3 mx-5 container  max-w-md mt-16"
      >
        <h1 className="text-2xl text-center my-5 font-bold text-black">
          Logando
        </h1>

        <Input
          title="Email"
          placeholder="Digite o seu email"
          name="email"
          register={register}
          error={errors.email}
        />

        <Input
          title="Senha"
          type="password"
          placeholder="Digite a sua senha"
          name="password"
          register={register}
          error={errors.password}
        />

        <button
          type="submit"
          className="bg-green-700 font-bold hover:bg-green-800 rounded-md text-white p-3"
        >
          Entrar
        </button>

        <span className="text-center text-black">
          Não possui uma conta?{" "}
          <Link to={"/cadastrar"} className="text-green-700 hover:underline">
            Cadastre-se
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Login;

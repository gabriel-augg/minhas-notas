import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router-dom";
import Input from "../components/Input";
import { RSchema } from "../utils/schema";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RSchema),
  });

  const { signUp, loadingAuth } = useContext(UserContext);

  const handleOnSubmit = async (user) => {
    await signUp(user);
  };

  return (
    <section className="h-screen w-full flex item-center justify-center">
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-3 mx-5 container  max-w-md mt-16"
      >
        <h1 className="text-2xl text-center my-5 font-bold text-black">
          Meu primeiro acesso
        </h1>

        <Input
          title="Usuário"
          placeholder="Digite o seu nome de usuário"
          name="username"
          register={register}
          error={errors.username}
        />

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

        <Input
          title="Confirmar senha"
          type="password"
          placeholder="Digite a sua senha novamente"
          name="confirmpassword"
          register={register}
          error={errors.confirmpassword}
        />

        {loadingAuth ? (
          <div className="flex justify-center align-center p-3.5 bg-green-800 rounded-md">
            <span className="loading loading-spinner loading-sm bg-white"></span>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-green-700 font-bold hover:bg-green-800 rounded-md text-white p-3"
          >
            Entrar
          </button>
        )}

        <span className="text-center text-black">
          Já possui uma conta?{" "}
          <Link to={"/login"} className="text-green-700 hover:underline">
            Entrar
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Register;

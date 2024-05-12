import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router-dom";
import Input from "../components/Input";
import { Loginchema } from "../utils/schema";
import AuthButton from "../components/AuthButton";
import Redirect from "../components/Redirect";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(Loginchema),
    });

    const { signIn, loadingAuth } = useContext(UserContext);

    const handleOnSubmit = async (user) => {
        await signIn(user);
    };

    return (
        <section className="min-h-screen flex justify-center items-center">
            <div className="w-5/6 max-w-md">
                <form
                    onSubmit={handleSubmit(handleOnSubmit)}
                    className="flex flex-col gap-3"
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

                    <AuthButton
                        title="Entrar"
                        loading={loadingAuth}
                        type="submit"
                    />

                    <Redirect
                        text="Não tem uma conta?"
                        linkText="Cadastre-se"
                        link="/cadastrar"
                    />
                </form>
            </div>
        </section>
    );
};

export default Login;

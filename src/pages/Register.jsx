import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/Input";
import { RSchema } from "../utils/schema";
import AuthButton from "../components/AuthButton";
import Redirect from "../components/Redirect";

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
        <section className="min-h-screen flex justify-center items-center">
            <div className="w-5/6 max-w-md mt-20 pb-10">
                <form
                    onSubmit={handleSubmit(handleOnSubmit)}
                    className="flex flex-col gap-3"
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

                    <AuthButton
                        title="Cadastrar"
                        loading={loadingAuth}
                        type="submit"
                    />

                    <Redirect
                        text="Já possui uma conta?"
                        linkText="Entrar"
                        link="/entrar"
                    />
                </form>
            </div>
        </section>
    );
};

export default Register;

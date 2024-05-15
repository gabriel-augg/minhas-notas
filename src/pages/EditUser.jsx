import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/Input";
import { ESchema } from "../utils/schema";
import AuthButton from "../components/AuthButton";

const EditUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ESchema),
    });

    const { updateUser, user, loadingAuth } = useContext(UserContext);

    async function handleOnSubmit(body) {
        await updateUser(body);
    }

    return (
        <section className="min-h-screen flex justify-center items-center">
            <div className="w-5/6 max-w-md">
                <form
                    onSubmit={handleSubmit(handleOnSubmit)}
                    className="flex flex-col gap-3"
                >
                    <h1 className="text-2xl text-center my-5 font-bold text-black">
                        Atualizando minha conta
                    </h1>

                    <Input
                        title="Usuário"
                        placeholder="Digite o seu nome de usuário"
                        name="username"
                        register={register}
                        value={user.username}
                        error={errors.username}
                    />

                    <Input
                        title="Email"
                        placeholder="Digite o seu email"
                        name="email"
                        register={register}
                        value={user.email}
                        error={errors.email}
                    />

                    <Input
                        title="Nova senha"
                        type="password"
                        placeholder="Digite a sua senha"
                        name="password"
                        register={register}
                    />

                    <Input
                        title="Confirmar senha"
                        type="password"
                        placeholder="Digite a sua senha novamente"
                        name="confirmpassword"
                        register={register}
                    />

                    <AuthButton
                        title="Salvar alterações"
                        loading={loadingAuth}
                        type="submit"
                    />
                </form>
            </div>
        </section>
    );
};

export default EditUser;

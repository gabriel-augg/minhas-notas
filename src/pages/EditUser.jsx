import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../components/Input";
import { EditSchema } from "../utils/schema";
import useRequest from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";


const EditUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(EditSchema),
    });

    const navigate = useNavigate()

    const { request } = useRequest()
    
    const { user, setUser } = useContext(UserContext);
    
    async function handleOnSubmit(body) {

        const response = await request("/users/update-user", {
            method: "put",
            data: body
        })

        if(response){
            setUser(response.data.user)
            navigate("/")
        }
    };


    return (
        <section className="h-screen w-full flex item-center justify-center">
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="flex flex-col gap-3 mx-5 container  max-w-md mt-16"
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

                <button
                    type="submit"
                    className="bg-green-700 font-bold hover:bg-green-800 rounded-md text-white p-3"
                >
                    Salvar
                </button>
            </form>
        </section>
    )
}

export default EditUser;
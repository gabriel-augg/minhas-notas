import { useForm } from "react-hook-form"

import { Link } from "react-router-dom";
import Input from "../components/Input";

const Login = () => {
    const { register, handleSubmit } = useForm()

    const handleOnSubmit = (user) => {
        console.log(user)
    }

    return (
        <section className="h-screen flex justify-center">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col min-w-96 gap-3 mt-5">

                <h1 className="text-2xl text-center my-5 font-bold text-black">Meu primeiro acesso</h1>

                <Input
                    title="Nome"
                    placeholder="Digite o seu nome de usuário"
                    name="username"
                    register={register}
                />

                <Input
                    title="Email"
                    placeholder="Digite o seu email"
                    name="email"
                    register={register}
                />

                <Input
                    title="Senha"
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
                >Cadastrar</button>

                <span
                    className="text-center text-black"
                >Já possui uma conta? <Link className="text-green-700 hover:underline">Entrar</Link></span>

            </form>
        </section>
    )
}

export default Login;
import InputError from "@/components/input-error";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type LoginForm = {
    email: string;
    password: string;
}

export default function Singin() {
    const {data, setData, post, errors} = useForm<Required<LoginForm>>({
        email:'',
        password:''
    });

    const submit:FormEventHandler = (e) => {
        e.preventDefault()
        post(route("login"))
    }

    return (
        <div className="w-screen h-screen bg-[url(/Pattern.png)] bg-cover bg-center flex justify-center items-center">
            <div
                className="
                    bg-(--primary-white)
                    w-11/12 md:w-2/3 xl:w-2/5 h-11/12
                    p-8 gap-24
                    flex flex-col
                    justify-start items-center
                    rounded-2xl
                    shadow-(--shadow)"
            >
                <div className="flex flex-col items-center">
                    <h1 className="w-full text-center text-5xl text-(--orange) mb-5 font-bold">Login</h1>
                    <p className="text-lg text-gray-500 w-3/4 text-center">
                        Bem-vindo(a) ao PetSite, entre e gerencie todos os atendimentos que já realizamos no seu melhor amigo
                    </p>
                </div>
                <form className="w-full flex flex-col gap-7 text-lg" onSubmit={submit}>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Informe seu email"
                            onChange={(e) => setData('email', e.target.value)}
                            value={data.email}
                            className="bg-(--primary-white) p-3 border-1 border-gray-300 rounded-xl outline-none"
                        />
                        <InputError message={errors.email}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Informe sua senha"
                            onChange={(e) => setData('password', e.target.value)}
                            value={data.password}
                            className="bg-(--primary-white) p-3 border-1 border-gray-300 rounded-xl outline-none"
                        />
                        <InputError message={errors.password}/>
                    </div>

                    <div className="flex flex-col items-center gap-5 w-full mt-20">
                        <input
                            className="bg-(--orange) p-3 text-lg w-full rounded-xl font-bold text-(--primary-white) hover:cursor-pointer hover:bg-(--dark-orange)"
                            type="submit"
                            value="Login"
                        />

                        <p className="text-gray-500">Ainda não tem uma conta? <Link className="hover:font-bold hover:cursor-pointer" href={route('register')}>Cadastre-se</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

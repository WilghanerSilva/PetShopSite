import InputError from "@/components/input-error";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Singup() {
    const {data, setData, post, errors} = useForm<Required<RegisterForm>>({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const submit:FormEventHandler = (e) => {
        e.preventDefault()
        post(route("register"))
    }

    return (
        <div className="w-screen h-screen bg-[url(/Pattern.png)] bg-cover bg-center flex justify-center items-center">
            <div
                className="
                    bg-(--primary-white)
                    w-11/12 md:w-2/3 xl:w-2/5 h-11/12
                    p-8 gap-10
                    flex flex-col
                    justify-start items-center
                    rounded-2xl
                    shadow-(--shadow)"
            >
                <div className="flex flex-col items-center">
                    <h1 className="w-full text-center text-5xl text-(--orange) mb-5 font-bold">Cadastro</h1>
                    <p className="text-lg text-gray-500 w-3/4 text-center">
                        Bem-vindo(a) ao PetSite, crie sua conta para gerenciar os atendimentos do seu amiguinho
                    </p>
                </div>

                <form
                    className="w-full flex flex-col gap-7 text-lg"
                    onSubmit={submit}
                >
                    <div className="flex flex-col gap-4">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome completo do usuário"
                            className="bg-(--primary-white) p-3 border-1 border-gray-300 rounded-xl outline-none"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name}/>

                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email do usuário"
                            className="bg-(--primary-white) p-3 border-1 border-gray-300 rounded-xl outline-none"
                            value={data.email}
                            onChange={e => setData('email', e.target.value.toLowerCase())}
                        />
                        <InputError message={errors.email}/>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Informe uma senha segura"
                            className="bg-(--primary-white) p-3 border-1 border-gray-300 rounded-xl outline-none"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password}/>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="password-confirm">Confirmar Senha</label>
                        <input
                            type="password"
                            name="password-confirm"
                            placeholder="Repita a senha informada"
                            className="bg-(--primary-white) p-3 border-1 border-gray-300 rounded-xl outline-none"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation}/>
                    </div>
                    <div className="flex flex-col items-center gap-5 w-full">
                        <input
                            className="bg-(--orange) p-3 text-lg w-full rounded-xl font-bold text-(--primary-white) hover:cursor-pointer hover:bg-(--dark-orange)"
                            type="submit"
                            value="Login"
                        />
                        <p className="text-gray-500">Já possui uma conta? <Link className="hover:font-bold hover:cursor-pointer" href={route('login')}> Realizeo o login</Link> </p>
                    </div>
                </form>

            </div>
        </div>
    )
}

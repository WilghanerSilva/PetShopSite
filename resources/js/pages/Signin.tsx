import InputError from "@/components/ui/input-error";
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
        <div className="w-screen min-h-screen bg-[url(/Pattern.png)] bg-cover bg-center flex justify-center items-center p-4">
            <div
                className="
                    bg-white
                    w-full max-w-xl
                    p-12 gap-16
                    flex flex-col
                    justify-start items-center
                    rounded-2xl
                    shadow-lg
                    overflow-y-auto
                "
            >
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-center text-5xl text-gray-700 font-bold">Login</h1>
                    <p className="text-lg text-gray-500 text-center">
                        Bem-vindo(a) ao PetSite, entre e gerencie todos os atendimentos que já realizamos no seu melhor amigo
                    </p>
                </div>

                <form className="w-full flex flex-col gap-6 text-lg" onSubmit={submit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Informe seu email"
                            onChange={(e) => setData('email', e.target.value)}
                            value={data.email}
                            className="p-3 border border-gray-300 rounded-xl outline-none"
                        />
                        <InputError message={errors.email}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Informe sua senha"
                            onChange={(e) => setData('password', e.target.value)}
                            value={data.password}
                            className="p-3 border border-gray-300 rounded-xl outline-none"
                        />
                        <InputError message={errors.password}/>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full mt-6">
                        <input
                            className="bg-gray-700 p-3 text-lg w-full rounded-xl font-bold text-white hover:cursor-pointer hover:bg-gray-800"
                            type="submit"
                            value="Login"
                        />
                        <p className="text-gray-500 text-center">
                            Ainda não tem uma conta?{" "}
                            <Link className="hover:font-bold hover:cursor-pointer" href={route('register')}>
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

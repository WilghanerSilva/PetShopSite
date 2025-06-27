import InputError from "@/components/ui/input-error";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Singup() {
  const { data, setData, post, errors } = useForm<Required<RegisterForm>>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("register"));
  };

  return (
    <div className="w-screen min-h-screen bg-[url(/Pattern.png)] bg-cover bg-center flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl py-16 px-8 gap-8 flex flex-col justify-start items-center rounded-2xl shadow-lg overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl text-gray-700 font-bold">Cadastro</h1>
          <p className="text-lg text-gray-500 text-center">
            Bem-vindo(a) ao PetSite, crie sua conta para gerenciar os atendimentos do seu amiguinho
          </p>
        </div>

        <form className="w-full flex flex-col gap-6 text-lg" onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Nome completo do usuário"
              className="p-3 border border-gray-300 rounded-xl outline-none"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email do usuário"
              className="p-3 border border-gray-300 rounded-xl outline-none"
              value={data.email}
              onChange={(e) => setData("email", e.target.value.toLowerCase())}
            />
            <InputError message={errors.email} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Informe uma senha segura"
              className="p-3 border border-gray-300 rounded-xl outline-none"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputError message={errors.password} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password_confirmation">Confirmar Senha</label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Repita a senha informada"
              className="p-3 border border-gray-300 rounded-xl outline-none"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <div className="flex flex-col items-center gap-4 w-full mt-4">
            <input
              className="bg-gray-700 p-3 text-lg w-full rounded-xl font-bold text-white hover:cursor-pointer hover:bg-gray-800"
              type="submit"
              value="Cadastrar"
            />
            <p className="text-gray-500 text-center">
              Já possui uma conta?{" "}
              <Link className="hover:font-bold hover:cursor-pointer" href={route("login")}>
                Realize o login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

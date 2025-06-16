import { Auth, Pet, User } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { ChangeEventHandler, FormEventHandler, useEffect} from "react";
import Select from "./ui/select";
import InputError from "./ui/input-error";

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type RegisterServiceForm = {
    date: string,
    type: string,
    is_done: boolean,
    customer_id: number,
    employee_id: number,
    pet_id: number
}

export default function ServiceForm ({showModal, setShowModal}: ModalProps) {
    const {auth, customers, pets} = usePage<{auth:Auth,customers:Array<User>, pets:Array<Pet>}>().props;
    const serviceTypes = ["Banho", "Tosa", "Corte de unhas", "Limpeza de ouvidos", "Limpesa completa", "Consulta Clínica", "Vacinação", "Castração"]
    const {data, setData, post, errors} = useForm<Required<RegisterServiceForm>>({
        date: "",
        type: "",
        is_done: true,
        customer_id: 0,
        employee_id: auth.user.id,
        pet_id: 0
    });

    useEffect(()=>{
        router.visit(route('home',{customer_id: data.customer_id}), {
                        preserveState: true,
                        preserveScroll: true
                    })
    },[data.customer_id])

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        post(route("service.store"), {
            onSuccess: () => {
                router.reload({
                    only:["services"]
                })
            }
        })
    }

    const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setData('is_done', e.target.value === "atendido")
    }

    return (
        <div className={`w-full min-h-screen absolute ${showModal ? 'flex' : 'hidden'} flex-col justify-center items-center bg-(--black) z-10`}>
            <div className="w-xl h-full px-8 pt-4 pb-12 flex flex-col items-center bg-white gap-10 rounded-2xl">
                <div className="flex justify-around items-center w-full">
                    <h1 className="font-bold text-3xl text-(--orange) w-full text-left">Criar Novo Atendimento</h1>
                    <button
                        className="text-(--orange) font-bold text-2xl hover:cursor-pointer"
                        onClick={() => {setShowModal(false)}}
                    >
                        x
                    </button>
                </div>
                <form className="flex flex-col justify-center gap-8" onSubmit={handleSubmit}>
                    <div className="w-full flex justify-between gap-4">
                        <label htmlFor="customer">Cliente</label>
                        <Select name="customer" onChange={e => setData('customer_id', parseInt(e.target.value))}>
                            <option> Selecionar</option>
                            {
                                customers.map((customer, index) => (
                                    <option value={customer.id} key={index}>{`${customer.name} - ${customer.id}`}</option>
                                ))
                            }
                        </Select>
                    </div>
                    <InputError message={errors.customer_id}/>

                    <div className="w-full flex justify-between gap-4">
                        <label htmlFor="pet">Pet</label>
                        <Select name="pet" onChange={e => setData('pet_id', parseInt(e.target.value))}>
                            <option> Selecionar</option>
                            {
                                pets.map((pet, index) => (
                                    <option value={pet.id} key={index}>{`${pet.name}`}</option>
                                ))
                            }
                        </Select>
                    </div>
                    <InputError message={errors.pet_id}/>

                    <div className="w-full flex justify-between gap-4">
                        <label htmlFor="type">Serviço</label>
                        <Select name="type" onChange={e => setData('type', e.target.value)}>
                            <option> Selecionar</option>
                            {
                                serviceTypes.map((serviceType, index) => (
                                    <option value={serviceType} key={index}>{`${serviceType}`}</option>
                                ))
                            }
                        </Select>
                    </div>
                    <InputError message={errors.type}/>

                    <div className="w-full flex justify-between gap-4">
                        <label htmlFor="date">Data do atendimento</label>
                        <input
                            className="min-w-24 border-1 p-1 border-(--orange) rounded-2xl text-(--orange) outline-none ml-3"
                            type="date"
                            name="date"
                            id="date"
                            onChange={e => setData('date', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.date}/>

                    <div className="w-full flex justify-between gap-4">
                        <label htmlFor="status">Status do atendimento</label>
                        <label>
                            <input
                                className="ml-3"
                                type="radio"
                                name="status"
                                value="marcado"
                                onChange={handleRadioChange}
                            />
                            Marcado
                        </label>
                        <label>
                            <input
                                className="ml-3"
                                type="radio"
                                name="status"
                                value="atendido"
                                onChange={handleRadioChange}
                            />
                            Atendido
                        </label>
                    </div>
                    <InputError message={errors.type}/>

                    <button type="submit" className="bg-(--orange) text-white rounded-xl font-bold px-2 py-1 hover:cursor-pointer hover:bg-(--dark-orange) text-nowrap">Adicionar</button>
                </form>
            </div>
        </div>
    )
}

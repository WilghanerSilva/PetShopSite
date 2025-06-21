import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import InputError from "@/components/ui/input-error";
import AppLayout from "@/layout/AppLayout";
import { User } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState} from "react";

interface OptionsType {
    value: string;
    label: string;
}

interface CreatePetForm {
    name: string;
    user_id: number;
    age: number;
    weight: number;
    breed: string;
    specie: string;
}

export default function CreatePet() {
    const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
    const [loadingBarShow, setLoadingBarShow] = useState(true);
    const {customers} = usePage<{customers: Array<User>}>().props;
    const {data, setData, post, errors} = useForm<Required<CreatePetForm>>({
            name: "",
            user_id: 0,
            age: 0,
            weight: 0,
            breed: "",
            specie: ""
    });

    const clearInputs = () => {
        setData('age', 0)
        setData('breed', '')
        setData('name', '')
        setData('specie', '')
        setData('user_id', 0)
        setData('weight', 0)
    }

    const generateOptions = () => {
        const options:Array<OptionsType> = [];

        customers.forEach(customer => {
            options.push({
                value: customer.id.toString(),
                label: customer.name
            })
        })

        return options;
    }

    const handleClick = () => {
        //document.getElementById('submit-btn')?.click();
    }

    const renderVisibility = () => {
        if(isShowSuccessMessage)
            return 'opacity-100 scale-100 pointer-events-auto'
        else
            return 'opacity-0 scale-95 pointer-events-none'
    }

    const renderLoadingBarSize = () => {
        if(loadingBarShow)
            return 'w-full'
        else
            return 'w-0.5'
    }

    const showSuccessMessage = () => {
        setIsShowSuccessMessage(true)
        setLoadingBarShow(false)
        setTimeout(() => {
            setIsShowSuccessMessage(false)
        }, 2000);
        setTimeout(() => {
            setLoadingBarShow(true)
        }, 2600);
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        post(route("dashboard.pet.store"), {
            onSuccess: () => {
                showSuccessMessage()
                clearInputs()
            }
        })
    }

    return (
        <AppLayout>
            <ComponentCard title="Cadastrar Pet" desc="Preencha o formulário para adicionar um pet" className="relative">
                <div className={`absolute right-6 top-6 dark:bg-gray-900 border border-success-400 py-4 px-2 rounded-lg ${renderVisibility()} transition duration-500 ease-in-out`}>
                    <span className="text-success-400 font-bold">Pet criado com sucesso!!</span>
                    <div className={`h-0.5 bg-success-400 rounded-full ${renderLoadingBarSize()} transition-all duration-[2000ms] ease-linear`}/>
                </div>
                <Form onSubmit={onSubmit} className="gap-4 flex flex-col">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                         name="name"
                         placeholder="Nome do pet"
                         type="text"
                         onChange={(e) => {setData('name', e.target.value)}}
                         value={data.name}
                        />
                    </div>
                    <InputError message={errors.name}/>
                    <div>
                        <Label>Tutor</Label>
                        <Select
                         options={generateOptions()}
                         placeholder="Selecione um tutor"
                         onChange={(value) => {setData('user_id', parseInt(value))}}
                        />
                    </div>
                    <InputError message={errors.user_id}/>
                    <div>
                        <Label htmlFor="age">Idade</Label>
                        <Input
                         name="age"
                         placeholder="Adicione a idade do pet"
                         type="number"
                         onChange={(e) => {setData('age', parseInt(e.target.value))}}
                         value={data.age}
                        />
                    </div>
                    <InputError message={errors.age}/>
                    <div>
                        <Label htmlFor="weight">Peso</Label>
                        <Input
                         name="weight"
                         placeholder="Adicione o peso do pet"
                         type="number"
                         onChange={(e) => {setData('weight', parseFloat(e.target.value))}}
                         value={data.weight}
                        />
                    </div>
                    <InputError message={errors.weight}/>
                    <div>
                        <Label htmlFor="specie">Especie</Label>
                        <Input
                         name="specie"
                         placeholder="Adicione a especie do pet"
                         type="text"
                         onChange={(e) => {setData('specie', e.target.value)}}
                         value={data.specie}
                        />
                    </div>
                    <InputError message={errors.specie}/>
                    <div>
                        <Label htmlFor="breed">Raça</Label>
                        <Input
                         name="breed"
                         placeholder="Adicione a raça do pet"
                         type="text"
                         onChange={(e) => {setData('breed', e.target.value)}}
                         value={data.breed}
                        />
                    </div>
                    <InputError message={errors.breed}/>
                    <button id="submit-btn" type="submit" hidden/>
                    <div className="inline-flex gap-2.5 items-center justify-center w-full">
                        <Button onClick={handleClick}>Adicionar</Button>
                        <Button className="bg-error-500 hover:bg-error-600" onClick={clearInputs}>Limpar</Button>
                    </div>
                </Form>
            </ComponentCard>
        </AppLayout>
    )
}

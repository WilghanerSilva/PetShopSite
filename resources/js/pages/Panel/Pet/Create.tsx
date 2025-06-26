import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import InputError from "@/components/ui/input-error";
import { PopUp } from "@/components/ui/pop-up";
import AppLayout from "@/layout/AppLayout";
import { User } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useRef} from "react";

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
    const {customers} = usePage<{customers: Array<User>}>().props;
    const {data, setData, post, errors} = useForm<Required<CreatePetForm>>({
            name: "",
            user_id: 0,
            age: 0,
            weight: 0,
            breed: "",
            specie: ""
    });

    const showMessageRef = useRef<()=>void | null>(null);

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

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        post(route("panel.pet.store"), {
            onSuccess: () => {
                showMessageRef.current?.()
                clearInputs()
            }
        })
    }

    return (
        <AppLayout>
            <ComponentCard title="Cadastrar Pet" desc="Preencha o formulário para adicionar um pet" className="relative">
                <PopUp message="Pet cadastrado com sucesso!!" variant="success" ref={showMessageRef}/>
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

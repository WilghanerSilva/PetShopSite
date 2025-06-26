import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import InputError from "@/components/ui/input-error";
import { PopUp } from "@/components/ui/pop-up";
import AppLayout from "@/layout/AppLayout";
import { Pet} from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useRef} from "react";

interface EditPetForm {
    name: string,
    age: number,
    weight: number,
    specie: string,
    breed: string,
}


export default function EditPet() {

    const {pet} = usePage<{pet:Pet}>().props;

    const showMessageRef = useRef<()=>void | null>(null);

    const {data, setData, put, errors} = useForm<Required<EditPetForm>>({
                name: pet.name,
                age: pet.age,
                weight: pet.weight,
                specie: pet.specie,
                breed: pet.breed
        });

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault()
            put(route('panel.pet.update', pet.id), {
                onSuccess:() => {
                    showMessageRef.current?.()
                }
            });
    }

    return (
        <AppLayout>
            <ComponentCard title="Editar Serviço" desc={`Atualmente você está editando: ${pet.name}`} className="relative">
                <PopUp message="Pet editado com sucesso" variant="success" ref={showMessageRef}/>
                <Form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="inline-flex gap-2 items-center">
                        <Label htmlFor="name">Nome:</Label>
                        <Input
                         name="name"
                         type="text"
                         placeholder="Editar nome"
                         value={data.name}
                         onChange={e => setData("name", e.target.value)}
                        />
                    </div>
                    <InputError message={errors.name}/>
                    <div className="inline-flex gap-2 items-center">
                        <Label htmlFor="specie">Especie</Label>
                        <Input
                            name="specie"
                            type="string"
                            placeholder="Editar especie"
                            value={data.specie}
                            onChange={e => setData("specie", e.target.value)}
                        />
                    </div>
                    <InputError message={errors.specie}/>
                    <div className="inline-flex gap-2 items-center">
                        <Label htmlFor="breed">Raça</Label>
                        <Input
                            name="breed"
                            type="string"
                            placeholder="Editar raça"
                            value={data.breed}
                            onChange={e => setData("breed", e.target.value)}
                        />
                    </div>
                    <InputError message={errors.breed}/>
                    <div className="inline-flex gap-2 items-center">
                        <Label htmlFor="age">Idade</Label>
                        <Input
                            name="age"
                            type="number"
                            placeholder="Editar idade"
                            value={data.age}
                            onChange={e => setData("age", parseInt(e.target.value))}
                        />
                    </div>
                    <InputError message={errors.age}/>
                    <div className="inline-flex gap-2 items-center">
                        <Label htmlFor="weight">Peso</Label>
                        <Input
                            name="weight"
                            type="number"
                            placeholder="Editar peso"
                            value={data.weight}
                            onChange={e => setData("weight", parseFloat(e.target.value))}
                        />
                    </div>
                    <InputError message={errors.weight}/>
                    <div className="inline-flex gap-2.5 items-center justify-center w-full">
                        <Button>Salvar</Button>
                    </div>
                </Form>
            </ComponentCard>
        </AppLayout>
    )
}

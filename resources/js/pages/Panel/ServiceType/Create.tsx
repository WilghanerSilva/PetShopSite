import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import InputError from "@/components/ui/input-error";
import { PopUp } from "@/components/ui/pop-up";
import AppLayout from "@/layout/AppLayout";
import { useForm} from "@inertiajs/react";
import { FormEventHandler, useRef} from "react";


interface CreateServiceType {
    name: string;
    price: number;
}

export default function CreateServiceType() {
    const {data, setData, post, errors} = useForm<Required<CreateServiceType>>({
            name: "",
            price: 0
    });

    const showMessageRef = useRef<()=>void | null>(null);

    const clearInputs = () => {
        setData('name', '')
        setData('price', 0.0)
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        post(route("panel.service-type.store"), {
            onSuccess: () => {
                showMessageRef.current?.()
                clearInputs()
            }
        })
    }

    return (
        <AppLayout>
            <ComponentCard title="Cadastrar Pet" desc="Preencha o formulário para adicionar um pet" className="relative">
                <PopUp message="Serviço cadastrado com sucesso" variant="success" ref={showMessageRef}/>
                <Form onSubmit={onSubmit} className="gap-4 flex flex-col">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                         name="name"
                         placeholder="Nome do serviço"
                         type="text"
                         onChange={(e) => {setData('name', e.target.value)}}
                         value={data.name}
                        />
                    </div>
                    <InputError message={errors.name}/>
                    <div>
                        <Label htmlFor="price">Preço</Label>
                        <Input
                         name="price"
                         placeholder="Adicione a idade do pet"
                         type="number"
                         onChange={(e) => {setData('price', parseFloat(e.target.value))}}
                         value={data.price}
                        />
                    </div>
                    <InputError message={errors.price}/>
                    <button id="submit-btn" type="submit" hidden/>
                    <div className="inline-flex gap-2.5 items-center justify-center w-full">
                        <Button>Adicionar</Button>
                        <Button className="bg-error-500 hover:bg-error-600" onClick={clearInputs}>Limpar</Button>
                    </div>
                </Form>
            </ComponentCard>
        </AppLayout>
    )
}

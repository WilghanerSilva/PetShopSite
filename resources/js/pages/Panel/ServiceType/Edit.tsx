import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import InputError from "@/components/ui/input-error";
import { PopUp } from "@/components/ui/pop-up";
import AppLayout from "@/layout/AppLayout";
import { ServiceType } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useRef} from "react";

interface EditServiceType {
    name: string,
    price: number
}


export default function EditServiceType() {

    const {serviceType} = usePage<{serviceType:ServiceType}>().props;

    const showMessageRef = useRef<()=>void | null>(null);

    const {data, setData, put, errors} = useForm<Required<EditServiceType>>({
                name: serviceType.name,
                price: serviceType.price
        });

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault()
            put(route('panel.service-type.update', serviceType.id), {
                onSuccess:() => {
                    showMessageRef.current?.()
                }
            });
        }

    return (
        <AppLayout>
            <ComponentCard title="Editar Serviço" desc={`Atualmente você está editando: ${serviceType.name}`} className="relative">
                <PopUp message="Serviço editado com sucesso" variant="success" ref={showMessageRef}/>
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
                        <Label htmlFor="price">Preço:</Label>
                        <Input
                            name="price"
                            type="number"
                            placeholder="Editar nome"
                            value={data.price}
                            onChange={e => setData("price", parseFloat(e.target.value))}
                        />
                    </div>
                    <InputError message={errors.price}/>
                    <div className="inline-flex gap-2.5 items-center justify-center w-full">
                        <Button>Salvar</Button>
                    </div>
                </Form>
            </ComponentCard>
        </AppLayout>
    )
}

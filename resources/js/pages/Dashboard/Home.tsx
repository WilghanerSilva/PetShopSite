import ComponentCard from "@/components/common/ComponentCard"
import Form from "@/components/form/Form"
import Label from "@/components/form/Label"
import MultiSelect from "@/components/form/MultiSelect"
import Select from "@/components/form/Select"
import Button from "@/components/ui/button/Button"
import InputError from "@/components/ui/input-error"
import AppLayout from "@/layout/AppLayout"
import { Auth, Pet, ServiceType, User } from "@/types"
import { router, useForm, usePage } from "@inertiajs/react"
import { FormEventHandler, useEffect, useState } from "react"

interface SelectOption {
  value: string;
  label: string;
}

interface MultSelectOption {
    value: string;
    text: string;
    selected: boolean;
}

type RegisterServiceForm = {
    is_done: boolean,
    customer_id: number,
    employee_id: number,
    pet_id: number,
    serviceTypes: Array<number>
    price: number,
}

export default function Dashboard() {
    const [petsOptions, setPetsOptions] = useState<Array<SelectOption>>([]);
    const [customersOptions, setCustomersOptions] = useState<Array<SelectOption>>([]);
    const [serviceTypesOptions, setServiceTypesOptions] = useState<Array<MultSelectOption>>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);


    const {auth, customers, serviceTypes, pets} = usePage<{auth:Auth,customers:Array<User>, serviceTypes:Array<ServiceType>,pets:Array<Pet>}>().props;
    const {data, setData, post, errors} = useForm<Required<RegisterServiceForm>>({
        serviceTypes: [],
        is_done: false,
        customer_id: 0,
        employee_id: auth.user.id,
        pet_id: 0,
        price: 0
    });

    useEffect(()=>{
        if(customers)
            setCustomersOptions(
                customers.map(customer => (
                    {value: customer.id.toString(), label: customer.name}
                ))
            )

        if(serviceTypes)
            setServiceTypesOptions(
                serviceTypes.map(serviceType => (
                    {value: serviceType.id.toString(), text: serviceType.name, selected:false}
                ))
            )

        if(pets)
            setPetsOptions(
                pets.map(pet => (
                    {value:pet.id.toString(), label:pet.name}
                ))
            )
    },[customers, serviceTypes, pets])

    useEffect(()=>{
        router.visit(route('dashboard',{customer_id: data.customer_id}), {
            preserveState: true,
            preserveScroll: true
        })
    },[data.customer_id])

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        post(route("service.store"), {
        })
    }

    const calculateTotalPrice = (ids: Array<number>) => {
        let newTotalPrice = 0;


        const filteredServiceTypes = serviceTypes.filter(serviceType => ids.includes(serviceType.id));

        filteredServiceTypes.forEach(serviceType => {
            newTotalPrice += serviceType.price
        })

        setTotalPrice(newTotalPrice);
        setData("price", newTotalPrice);
    }

    const handleChangeSelectedValues = (values: Array<string>) => {
        const convertedValues = values.map(value => parseInt(value));
        calculateTotalPrice(convertedValues);
        setSelectedValues(values);
        setData("serviceTypes", convertedValues);
    }

    return (
        <AppLayout>
            <div className="border border-brand-200 rounded-xl h-full">
                    <ComponentCard title="Adicionar Atendimento">
                        <div className="flex justify-between px-8">
                            <Form onSubmit={onSubmit} className="flex justify-center flex-col gap-5">
                                <div>
                                    <Label>Cliente</Label>
                                    <Select
                                    options={customersOptions}
                                    onChange={(value)=>{setData("customer_id", parseInt(value))}}/>
                                </div>
                                <InputError message={errors.customer_id}/>
                                <div>
                                    <Label>Pet</Label>
                                    <Select
                                    options={petsOptions}
                                    onChange={(value) => {setData("pet_id", parseInt(value))}}/>
                                </div>
                                <InputError message={errors.pet_id}/>
                                <div className="text-amber-50">
                                    <MultiSelect
                                        label="Serviços"
                                        options={serviceTypesOptions}
                                        onChange={values => handleChangeSelectedValues(values)}
                                    />
                                    <p className="sr-only">
                                        Selected Values: {selectedValues.join(", ")}
                                    </p>
                                </div>
                                <InputError message={errors.serviceTypes}/>
                                <Button>Adicionar</Button>

                            </Form>
                            <h1 className="text-success-600 text-xl font-bold">{`Valor: R$${totalPrice.toFixed(2)}`}</h1>
                        </div>

                    </ComponentCard>
            </div>
        </AppLayout>
    )
}

import ComponentCard from "@/components/common/ComponentCard"
import Form from "@/components/form/Form"
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import MultiSelect from "@/components/form/MultiSelect"
import Select from "@/components/form/Select"
import Button from "@/components/ui/button/Button"
import InputError from "@/components/ui/input-error"
import { Modal } from "@/components/ui/modal"
import { usePosSession } from "@/context/PosSessionContext"
import AppLayout from "@/layout/AppLayout"
import { Auth, Pet, PosSession, Service, ServiceType, User } from "@/types"
import { router, useForm, usePage } from "@inertiajs/react"
import { CalendarClockIcon, CircleDollarSignIcon, HandCoinsIcon } from "lucide-react"
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
    pos_session_id: number,
    pet_id: number,
    serviceTypes: Array<number>
    price: number,
}

type CreateSessionForm = {
    user_id: number,
    balance: number,
    opening_balance: number,
    closing_balance: number | null,
    description: string
}


export default function Dashboard() {
    const [petsOptions, setPetsOptions] = useState<Array<SelectOption>>([]);
    const [customersOptions, setCustomersOptions] = useState<Array<SelectOption>>([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [serviceTypesOptions, setServiceTypesOptions] = useState<Array<MultSelectOption>>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [currentService, setCurrentService] = useState<Service | null>(null);
    const {posSession, setPosSession} = usePosSession();
    const currentParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;

    const {services, session, auth, customers, serviceTypes, pets} = usePage<{
        auth:Auth,
        customers:Array<User>,
        serviceTypes:Array<ServiceType>,
        pets:Array<Pet>
        services:Array<Service>,
        session:PosSession
    }>().props;

    const {data: serviceData, setData: setServiceData, post: postServiceForm, errors:serviceFormErrors} = useForm<Required<RegisterServiceForm>>({
        serviceTypes: [],
        is_done: false,
        customer_id: 0,
        employee_id: auth.user.id,
        pet_id: 0,
        price: 0,
        pos_session_id: 0
    });

    const {data: sessionData, setData: setSessionData, post: postSessionForm, errors :sessionFormErros} = useForm<Required<CreateSessionForm>>({
        user_id: auth.user.id,
        opening_balance: 0,
        balance: 0,
        closing_balance: 0,
        description: ""
    })

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

        if(session)
            setPosSession(session)

        console.log(services)

    },[customers, serviceTypes, pets, session])

    useEffect(()=>{
        currentParams.set('customer_id', serviceData.customer_id.toString());
        router.visit(`${path}?${currentParams.toString()}`, {
            preserveState: true,
            preserveScroll: true
        })
    },[serviceData.customer_id])

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setServiceData("pos_session_id", session.id)
        postServiceForm(route("service.store"), {
            onSuccess: () => {
                router.reload({
                    only:["services"]
                })
            }
        })
    }

    const createSession:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setSessionData("opening_balance", sessionData.balance)
        postSessionForm(route("panel.pos_session.store"))
    }

    const calculateTotalPrice = (ids: Array<number>) => {
        let newTotalPrice = 0;


        const filteredServiceTypes = serviceTypes.filter(serviceType => ids.includes(serviceType.id));

        filteredServiceTypes.forEach(serviceType => {
            newTotalPrice += serviceType.price
        })

        setTotalPrice(newTotalPrice);
        setServiceData("price", newTotalPrice);
    }

    const handleChangeSelectedValues = (values: Array<string>) => {
        const convertedValues = values.map(value => parseInt(value));
        calculateTotalPrice(convertedValues);
        setSelectedValues(values);
        setServiceData("serviceTypes", convertedValues);
    }

    const renderServiceItem = (service: Service) => {
        return (
            <div
                className="text-bold text-gray-600 dark:text-gray-400 w-full grid grid-cols-3 px-4 border border-gray-700 rounded-2xl"
                onClick={()=>{setCurrentService(service)}}
            >
                <div>
                    <p className="text-black text-xl dark:text-white font-bold">{service.customer_name}</p>
                    <p>{service.pet_name}</p>
                </div>
                <p className="self-center text-black text-lg dark:text-white font-bold">R$ {service.price}</p>
                <p className={`justify-self-end self-center py-1 px-2 rounded-full font-bold text-white ${service.is_done ? 'bg-sucess-600':'bg-gray-600'}`}>{service.is_done ? 'Finalizado' : 'Em progresso'}</p>
            </div>
        )
    }

    const renderPage = () => {
        if(posSession){
            return (
                <div className="grid grid-rows-[auto_1fr] grid-cols-2 gap-4 flex-1">

                    <div className="col-span-2 p-4 rounded inline-flex justify-center gap-8 text-gray-800 dark:text-white/90">
                        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 flex flex-col gap-8 w-fit">
                            <div className="inline-flex gap-12 items-center">
                                <h3 className="font-bold text-gray-500 dark:text-gray-400">Total de vendas</h3>
                                <div className="p-1.5 bg-success-500 rounded-md w-fit text-white">
                                    <HandCoinsIcon/>
                                </div>
                            </div>
                            <p className="text-black dark:text-white text-2xl font-bold col-span-2 w-fit">R$ {session.balance - session.opening_balance}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 flex flex-col gap-8 w-fit">
                            <div className="inline-flex gap-12 items-center">
                                <h3 className="font-bold text-gray-500 dark:text-gray-400">Saldo Atual</h3>
                                <div className="p-1.5 bg-success-500 rounded-md w-fit text-white">
                                    <CircleDollarSignIcon/>
                                </div>
                            </div>
                            <p className="text-black dark:text-white text-2xl font-bold col-span-2 w-fit">R$ {session.opening_balance}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 flex flex-col gap-8 w-fit">
                            <div className="inline-flex gap-12 items-center">
                                <h3 className="font-bold text-gray-500 dark:text-gray-400">Atendimentos em andamento</h3>
                                <div className="p-1.5 bg-warning-500 rounded-md w-fit text-white">
                                    <CalendarClockIcon/>
                                </div>
                            </div>
                            <p className="text-black dark:text-white text-2xl font-bold col-span-2 w-fit">{services.filter(service => !service.is_done).length}</p>
                        </div>
                    </div>

                    <ComponentCard title="Adicionar Atendimento" className="w-full">
                        <div className="flex justify-between px-8">
                            <Form onSubmit={onSubmit} className="flex justify-center flex-col gap-5 w-full">
                                <h1 className="text-success-600 text-xl font-bold">{`Valor: R$${totalPrice.toFixed(2)}`}</h1>
                                <div>
                                    <Label>Cliente</Label>
                                    <Select
                                    options={customersOptions}
                                    onChange={(value)=>{setServiceData("customer_id", parseInt(value))}}/>
                                </div>
                                <InputError message={serviceFormErrors.customer_id}/>
                                <div>
                                    <Label>Pet</Label>
                                    <Select
                                    options={petsOptions}
                                    onChange={(value) => {setServiceData("pet_id", parseInt(value))}}/>
                                </div>
                                <InputError message={serviceFormErrors.pet_id}/>
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
                                <InputError message={serviceFormErrors.serviceTypes}/>
                                <Button>Adicionar</Button>
                            </Form>
                        </div>

                    </ComponentCard>

                    <Modal isOpen={!!currentService} onClose={()=>{setCurrentService(null)}}>
                        {
                            currentService
                            &&
                            <div className="border border-gray-500 p-4 flex flex-col items-center text-gray-600 dark:text-white w-full">
                                <div className="flex flex-col gap-3 text-xl border border-gray-600 p-6 rounded-lg">
                                    <div>
                                        <label className="font-bold">Cliente:</label>
                                        <span>{currentService.customer_name}</span>
                                    </div>
                                    <div>
                                        <label className="font-bold">Pet: </label>
                                        <span>{currentService.pet_name}</span>
                                    </div>
                                    <div>
                                        <label className="font-bold">Valor:</label>
                                        <span>R$ {currentService.price}</span>
                                    </div>

                                    <div className="inline-flex gap-2">
                                        {
                                            currentService.types.map(type => (
                                                <div className="bg-gray-600 w-fit px-3 py-1.5 rounded-full">{type.name}</div>
                                            ))
                                        }
                                    </div>
                                    {
                                        !currentService.is_done && <Button>Finalizar Atendimento</Button>
                                    }
                                </div>
                            </div>
                        }
                    </Modal>

                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] w-full flex flex-col items-center p-4">
                        <div className="inline-flex gap-2 h-1/6">
                            <button className="font-bold text-white text-xl py-8 w-52 rounded-md bg-gray-600 h-fit">Em Progresso</button>
                            <button className="font-bold text-white text-xl py-8 w-52 rounded-md bg-gray-600 h-fit">Finalizados</button>

                            <button className="font-bold text-white text-xl py-8 w-52 rounded-md bg-gray-600 h-fit">Todos</button>
                        </div>
                        <div className="flex flex-col mt-4 overflow-y-scroll w-full h-4/5 gap-4 pt-4">
                            {
                                services && services.map(service => (renderServiceItem(service)))
                            }
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div className="flex-1 h-full flex justify-center items-center">
                    <ComponentCard title="Inciar Caixa" desc="O caixa está fechado, preencha o formulário para abrir o caixa">
                        <Form onSubmit={createSession} className="flex flex-col gap-4">

                            <div className="inline-flex gap-4 items-center justify-between">
                                <Label className="font-bold text-xl">Valor de abertura</Label>
                                <Input
                                    className="w-full"
                                    value={sessionData.balance}
                                    type="number"
                                    placeholder="Valor inicial do caixa"
                                    onChange={(e) => setSessionData("balance", parseFloat(e.target.value))}
                                />
                            </div>
                            <InputError message={sessionFormErros.balance}/>
                            <Input
                                className="h-28"
                                value={sessionData.description}
                                type="text"
                                placeholder="Descrição da abertura"
                                onChange={(e) => setSessionData("description", e.target.value)}
                            />
                            <InputError message={sessionFormErros.description}/>
                            <Button>Abrir Caixa</Button>
                        </Form>
                    </ComponentCard>
                </div>
            )
        }
    }

    return (
        <AppLayout>
            {renderPage()}
        </AppLayout>
    )
}

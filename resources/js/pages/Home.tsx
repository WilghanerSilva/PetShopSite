import Navbar from "@/components/navbar"
import Pagination from "@/components/pagination";
import ServiceCard from "@/components/service-card";
import ServiceForm from "@/components/service-form";
import { Auth, PaginationType } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react"
import { Service } from '../types/index';



export default function Home () {
    const [orderBy, setOrderBy] = useState("");
    const [direction, setDirection] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [orderOptions, setOrderOptions] = useState<Array<string>>([]);
    const {pagination, auth} = usePage<{pagination:PaginationType, auth:Auth}>().props;

    useEffect(()=> {
        if(auth.user.role !== "customer")
            router.visit(route('panel.pdv'))
    },[])

    useEffect(()=>{
        if(orderBy === "pet"){
            setOrderOptions(["A-Z","Z-A"])
        } else if(orderBy === "data") {
            setOrderOptions(["Mais recente", "Mais antigo"])
        } else {
            setOrderOptions([])
        }
    }, [orderBy])

    useEffect(()=>{
        if(orderBy && direction)
            router.visit(route('home',{sort: orderBy, direction: direction}), {
                preserveState: true,
                preserveScroll: true
            })
    }, [direction])

    return (
        <div className="w-full h-full min-h-screen bg-white flex flex-col items-center">
            <Navbar/>
            <ServiceForm showModal={showModal} setShowModal={setShowModal}/>
            <div className="w-full px-8 py-12">
                <div>
                    <div className="flex justify-between items-center md:flex-row flex-col gap-6">
                        <h1 className="font-bold text-3xl text-(--orange)">Seus Atendimentos</h1>
                        <div className="flex gap-4 flex-nowrap">
                            <div>
                                <label htmlFor="order-by" className="font-semibold text-(--orange)">Ordenar por: </label>
                                <select
                                    name="order-by"
                                    id="order-by"
                                    onChange={e => {setOrderBy(e.target.value)}}
                                    className="min-w-24 border-1 p-1 border-(--orange) rounded-2xl text-(--orange) outline-none "
                                >
                                    <option>Selecionar</option>
                                    <option value="pet">Pet</option>
                                    <option value="data">Data</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="order" className="font-semibold text-(--orange)">Ordem: </label>
                                <select
                                    name="order"
                                    className="border-1 p-1 border-(--orange) rounded-2xl text-(--orange) outline-none "
                                    onChange={e => {setDirection(e.target.value)}}
                                >
                                    <option>Selecionar</option>
                                    {
                                        orderOptions.map((order, index) => (
                                            <option value={index == 0 ? 'asc' : 'desc'} key={index}>{order}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                auth.user.role == "employee" || auth.user.role == "admin"
                                &&
                                <button
                                    className="bg-(--orange) text-white rounded-xl font-bold px-2 py-1 hover:cursor-pointer hover:bg-(--dark-orange) text-nowrap"
                                    onClick={()=>{setShowModal(true)}}
                                >
                                    Adicionar Atendimento +
                                </button>
                            }
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(460px,1fr))] gap-12 py-8 mt-12 justify-items-center">
                        {pagination.data.map((service, index) => (
                            <ServiceCard service={service as Service} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
            <Pagination pagination={pagination} queryParams={`${direction && orderBy ? `direction=${direction}&sort=${orderBy}` : ''}`}/>
        </div>
    )
}

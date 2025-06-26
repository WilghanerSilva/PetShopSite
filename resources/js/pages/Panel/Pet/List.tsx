import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { PopUp } from "@/components/ui/pop-up";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { CloseIcon } from "@/icons";
import AppLayout from "@/layout/AppLayout";
import { Pet} from "@/types";
import { router, usePage } from "@inertiajs/react";
import { TrashIcon, PencilIcon, ChevronDown, ChevronUp} from "lucide-react";
import { FormEventHandler, useEffect, useRef, useState } from "react";

export default function Pets() {
    const {pets} = usePage<{pets:Array<Pet>}>().props
    const [sort, setSort] = useState("id");
    const [order, setOrder] = useState("asc");
    const [query, setQuery] = useState("");
    const [confirming, setConfirming] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const showMessageRef = useRef<()=>void | null>(null);

    useEffect(()=>{
        if(query == "")
            router.visit(route('panel.pet.index',{sort: sort, direction: order}), {
                preserveState: true,
                preserveScroll: true
            })
        else
            router.visit(route('panel.pet.index',{sort: sort, direction: order, query: query}), {
                preserveState: true,
                preserveScroll: true
            })
    }, [sort, order])

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        router.visit(route('panel.pet.index',{sort: sort, direction: order, query: query}), {
            preserveState: true,
            preserveScroll: true
        })
    }

    const getColorByIndex = (index: number):string => {
        if((index % 2) !== 0)
            return 'dark:bg-gray-800';
        else
            return 'dark:bg-gray-900';
    }

    const renderIcon = ()  => {
        if(order === "asc")
            return <ChevronDown/>
        else
            return <ChevronUp/>
    }

    const handleSetOrder = () => {
        if(order === "asc")
            setOrder("desc")
        else
            setOrder("asc")
    }

    const renderButton = (headerElement: string) => {
        if(sort == headerElement){
            return <button onClick={()=>{handleSetOrder()}}>{renderIcon()}</button>
        }
    }

    const handleShowConfirmingModal = (id: number) => {
        if(id){
            setDeletingId(id);
            setConfirming(true);
        }
    }

    const handleCloseConfirmingModal = () => {
        setDeletingId(null);
        setConfirming(false);
    }

    const handleConfirmDelete = () => {
        router.delete(`/panel/pet/${deletingId}`, {
            onSuccess: () => {
                router.reload({
                    only:["pets"]
                });
                showMessageRef.current?.()
                handleCloseConfirmingModal()
            }
        })
    }

    return (
        <AppLayout>
            <Modal isOpen={confirming} onClose={handleCloseConfirmingModal}>
                <div className="h-full w-full flex flex-col justify-center items-center p-8 gap-4">
                    <p className="text-brand-200 font-bold text-xl">Tem certeza de que deseja excluir o pet do seu sistema?</p>
                    <div className="inline-flex gap-4">
                        <Button startIcon={<TrashIcon/>} onClick={handleConfirmDelete}>Excluir</Button>
                        <Button startIcon={<CloseIcon/>} onClick={handleCloseConfirmingModal}>Cancelar</Button>
                    </div>
                </div>
            </Modal>
            <div className="flex-1 dark:bg-gray-900 text-brand-200 h-full relative">
                <PopUp message="Pet excluido com sucesso" variant="success" ref={showMessageRef}/>
                <div className="flex items-center justify-between mb-9">
                    <h1 className="font-bold text-2xl text-center">Pets</h1>
                    <div className="hidden lg:block">
                        <form onSubmit={onSubmit}>
                        <div className="relative">
                            <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                            <svg
                                className="fill-gray-500 dark:fill-gray-400"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                fill=""
                                />
                            </svg>
                            </span>
                            <input
                             type="text"
                             placeholder="Pesquisar pet"
                             className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                             value={query}
                             onChange={e => {setQuery(e.target.value)}}
                            />

                            <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                                <span> ⌘ </span>
                                <span> K </span>
                            </button>
                        </div>
                        </form>
                    </div>
                    <button
                     className="bg-brand-700 hover:bg-brand-900 px-2 py-1 rounded-xl font-bold text-white"
                     onClick={() => {router.visit(route("panel.pet.create"))}}
                    >
                        Adicionar Pet +
                    </button>
                </div>
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 flex items-center gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                     onClick={() => {setSort("id")}}
                                     className="hover:cursor-pointer"
                                    >
                                        ID
                                    </span>
                                    {renderButton("id")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-max"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                     onClick={() => {setSort("name")}}
                                     className="hover:cursor-pointer"
                                    >
                                        Nome
                                    </span>
                                    {renderButton("name")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                     onClick={() => {setSort("age")}}
                                     className="hover:cursor-pointer"
                                    >
                                        Idade
                                    </span>
                                    {renderButton("age")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                     onClick={() => {setSort("weight")}}
                                     className="hover:cursor-pointer"
                                    >
                                        Peso
                                    </span>
                                    {renderButton("weight")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                    onClick={() => {setSort("specie")}}
                                    className="hover:cursor-pointer"
                                    >
                                        Especie
                                    </span>
                                    {renderButton("specie")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                     onClick={() => {setSort("breed")}}
                                     className="hover:cursor-pointer"
                                    >
                                        Raça
                                    </span>
                                    {renderButton("breed")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                     onClick={() => {setSort("user_name")}}
                                     className="hover:cursor-pointer"
                                    >
                                        Dono
                                    </span>
                                    {renderButton("user_name")}
                                </div>
                            </TableCell>
                            <TableCell
                             isHeader={true}
                             className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            pets
                            &&
                            pets.map((pet, index) => (
                                <TableRow key={pet.id} className={getColorByIndex(index)}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.id}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.age}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.weight}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.specie}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.breed}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {pet.user_name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex gap-4">
                                        <button onClick={()=> router.visit(route('panel.pet.edit', pet.id))}><PencilIcon color="#3641F5"/></button>
                                        <button onClick={() => handleShowConfirmingModal(pet.id)}><TrashIcon color="#D92D20"/></button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}

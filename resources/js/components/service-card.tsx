import { Service } from "@/types"

interface CardProps {
    service: Service
}

export default function ServiceCard({service}:CardProps) {

    const dateFormat = (date:string) => {
        const parts = date.split("-");

        return `${parts[2]}/${parts[1]}/${parts[0]}`
    }


    return (
        <div className="w-md border border-(--orange) rounded-xl pl-4 shadow-(--shadow) bg-(--orange) hover:cursor-pointer">
            <div className="flex justify-between items-center bg-(--primary-white) rounded-r-xl p-2">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-xl">{service.pet_name}</h1>
                    <p className="font-semibold">Serviço: {service.type}</p>
                    <p>Data: {dateFormat(service.date)}</p>
                </div>
                <p className="font-semibold rounded-2xl bg-(--light-yellow) px-4 py-1">{service.is_done ? "Finalizado" : "Marcado"}</p>
            </div>
        </div>
    )
}

import { PaginationType } from "@/types";
import { router } from "@inertiajs/react";

interface PaginationProps {
    pagination: PaginationType
    queryParams?: string
}

export default function Pagination({pagination, queryParams}:PaginationProps) {
    const handleClick = (url: string | null) => {
        if (!url) return;
        router.visit(url+"&"+queryParams, {preserveState: true});
    }

    return (
        <div className="flex gap-4">
            {
                pagination.links.map((link, index) => (
                    <button
                        className={`
                            ${!link.url ? 'text-gray-500 border-gray-500' : 'text-(--orange) border-(--orange) hover:cursor-pointer hover:scale-125'}
                            ${link.active && 'scale-125'}
                            transition-transform
                            duration-200
                            ease-in-out
                            border
                            border-(--orange)
                            p-2
                            bg-white
                            rounded-lg
                            text-(--orange)
                            font-bold`}
                        key={index}
                        disabled={!link.url}
                        onClick={()=>handleClick(link.url)}
                        dangerouslySetInnerHTML={{__html: link.label}}
                    />
                ))
            }
        </div>
    )
}

import Navbar from "@/components/navbar"
import Pagination from "@/components/pagination";
import { PetCard } from "@/components/pet-card";
import { Auth, PaginationType, Pet } from "@/types";
import { usePage } from "@inertiajs/react";



export default function PetIndex() {
    const {pagination} = usePage<{pagination:PaginationType, auth:Auth}>().props;

    function renderPets() {
        if (!pagination.data || pagination.data.length === 0) {
            return <h1>Parece que você ainda não tem pets :(</h1>;
        }

        return pagination.data.map((pet, index) => (
            <PetCard pet={pet as Pet} key={index} />
        ));
    }

    return (
        <div className="w-full h-full min-h-screen bg-white flex flex-col items-center">
                    <Navbar/>
                    <div className="w-full px-8 py-12">
                        <div>
                            <div className="flex justify-between items-center md:flex-row flex-col gap-6">
                                <h1 className="font-bold text-3xl text-(--orange)">Seus pets</h1>
                            </div>

                            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(460px,1fr))] gap-12 py-8 mt-12 justify-items-center">
                                {
                                    renderPets()
                                }
                            </div>

                        </div>
                    </div>
                    <div className="mt-16">
                        <Pagination pagination={pagination} />
                    </div>
                </div>
    )
}

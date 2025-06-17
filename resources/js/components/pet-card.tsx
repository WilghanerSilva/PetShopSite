import { Pet } from '../types/index';

interface PetCardProps {
    pet: Pet
}

export function PetCard({pet}: PetCardProps){
    function renderProfile() {
        if(pet.specie == "Dog")
            return "bg-[url(/dog-profile.png)]"

        if(pet.specie == "Cat")
            return "bg-[url(/cat-profile.png)]"
    }


    return (
        <div className="w-[300px] h-[400px] border border-(--orange) rounded-xl pt-4 shadow-(--shadow) bg-(--orange) hover:cursor-pointer">
            <div className="flex justify-between items-center bg-(--primary-white) rounded-b-xl p-2 h-full">
                <div className="flex flex-col justify-start items-center gap-2 w-full h-full">
                    <h1 className="font-bold text-4xl text-(--orange)">{pet.name}</h1>
                    <div className={`w-[180px] h-[180px] ${renderProfile()} bg-center bg-cover rounded-full`}/>
                    <div className="w-full text-(--orange) text-xl flex flex-col justify-center items-center pl-9">
                        <div className="flex gap-2 justify-start w-full">
                            <p className="font-bold">Raça:</p>
                            <p>{pet.breed}</p>
                        </div>
                        <div className="flex gap-2 justify-start w-full">
                            <p className="font-bold">Idade:</p>
                            <p>{`${pet.age} anos`}</p>
                        </div>
                        <div className="flex gap-2 justify-start w-full">
                            <p className="font-bold">Peso:</p>
                            <p>{`${pet.weight} quilos`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

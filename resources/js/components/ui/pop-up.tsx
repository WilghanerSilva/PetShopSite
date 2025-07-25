import { forwardRef, useImperativeHandle, useState } from "react";

interface PopUpProps {
  message: string;
  variant?: "success" | "error";
}

export const PopUp = forwardRef(({
        message
    }:PopUpProps, ref) => {


    const [isOpen, setIsOpen] = useState(false);
    const [loadingBarShow, setLoadingBarShow] = useState(true);

    const renderVisibility = () => {
        if(isOpen)
            return 'opacity-100 scale-100 pointer-events-auto'
        else
            return 'opacity-0 scale-95 pointer-events-none'
    }

    const renderLoadingBarSize = () => {
        if(loadingBarShow)
            return 'w-full'
        else
            return 'w-0.5'
    }

    const showMessage = () => {
        setIsOpen(true)
        setLoadingBarShow(false)
        setTimeout(() => {
            setIsOpen(false)
        }, 2000);
        setTimeout(() => {
            setLoadingBarShow(true)
        }, 2600);
    }

    useImperativeHandle(ref, () => showMessage);

    return (
        <div className={`absolute right-6 top-6 dark:bg-gray-900 border border-success-600 py-4 px-2 rounded-lg ${renderVisibility()} transition duration-500 ease-in-out`}>
            <span className={`text-success-600 font-bold`}>{message}</span>
            <div className={`h-0.5 bg-success-600 rounded-full ${renderLoadingBarSize()} transition-all duration-[2000ms] ease-linear`}/>
        </div>
    )
})

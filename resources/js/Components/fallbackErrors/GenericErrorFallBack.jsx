export default function GenericErrorFallBack() {
    return (
        <div className="w-full h-full min-h-[10rem] max-h-[25rem] max-w-[25rem] flex flex-col p-8 mx-auto rounded-md gap-4 items-center justify-center border-2 border-red-600 bg-red-200">
            <strong className="text-red-600 text-xl ">
                ¡¡Oops Algo Ha Salido Mal!!
            </strong>

            <p className="text-red-500 text-center">
                Un error inesperado a ocurrido, estamos trabajando en arreglarlo
                lo antes posible.
            </p>
        </div>
    );
}

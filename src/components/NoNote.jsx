import image from "../assets/bg_image.svg"

const NoNote = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="mt-20 md:mt-2">
                <img src={image} width={350} alt="background image" />
                <h1 className="text-lg text-center text-lime-700 font-bold mt-7">Parece que você ainda não criou nenhuma nota</h1>
            </div>
            
        </div>
    )
}

export default NoNote;
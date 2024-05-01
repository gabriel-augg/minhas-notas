import image from "../assets/bg_image.svg"

const NoNote = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 py-10">
            <img src={image} width={500} alt="background image" />
            <h1 className="text-lg text-lime-700">Parece que você ainda não criou uma nota</h1>
        </div>
    )
}

export default NoNote;
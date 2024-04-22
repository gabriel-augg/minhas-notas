import logo from "../assets/logo.svg"

const Header = () => {
    return(
        <header className="p-4 flex justify-center bg-green-950">
            <div>
                <img src={logo} width={120} alt="logo" />
            </div>
        </header>
    )
}

export default Header;
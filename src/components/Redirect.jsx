import { Link } from "react-router-dom";

export default function Redirect({ text, link, linkText }) {
    return (
        <span className="text-center text-black">
            {text}{" "}
            <Link to={link} className="text-green-700 hover:underline">
                {linkText}
            </Link>
        </span>
    );
}

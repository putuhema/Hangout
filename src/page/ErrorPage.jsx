import Container from "@/components/layout/Container"
import img from "@/assets/404.png"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <Container>
            <div className="w-full flex flex-col  items-center">
                <Link to="/" className="flex gap-2 self-start">
                    <ArrowLeft />
                    back to home
                </Link>
                <img src={img} alt="404" />
            </div>
        </Container>
    )
}

export default ErrorPage
import Container from "@/components/layout/Container";
// import img from "@/assets/404.png"
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useRive } from "@rive-app/react-canvas";
import _404 from "@/assets/404.riv";

const ErrorPage = () => {
  const { RiveComponent } = useRive({
    src: _404,
    stateMachines: "State Machine 1",
    autoplay: true,
  });
  return (
    <Container>
      <div className="w-full flex flex-col items-center justify-center">
        <Link to="/" className="flex gap-2 self-start">
          <ArrowLeft />
          back to home
        </Link>
        <div className="w-[800px] h-[800px]">
          <RiveComponent />
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;

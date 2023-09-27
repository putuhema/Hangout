import { useRive } from "@rive-app/react-canvas";
import empty from "@/assets/empty.riv";
const RiveEmpty = () => {
  const STATE_MACHINE = "State Machine 1";
  const { RiveComponent } = useRive({
    src: empty,
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });

  return <RiveComponent />;
};

export default RiveEmpty;

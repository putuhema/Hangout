import { decrement, increment } from "@/redux/global";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.global.count);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <input type="text" value={count} />
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;

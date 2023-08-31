import { decrement, increment } from "@/redux/counter";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  console.log(count);
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <input type="text" value={count} />
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Dashboard;

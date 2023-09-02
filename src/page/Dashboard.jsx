import EventList from "@/components/dashboard/EventList";
import Registration from "@/components/dashboard/Registration";
import Transaction from "@/components/dashboard/Transaction";
import Statistic from "@/components/dashboard/Statistic";
import { useState } from "react";
import Container from "@/components/layout/Container";

const Dashboard = () => {
  const [path, setPath] = useState("Events");

  const onChange = () => {};
  const onClick = (e) => {
    setPath(e.target.value);
  };

  let render;
  if (path === "Events") {
    render = <EventList />;
  } else if (path === "Registration") {
    render = <Registration />;
  } else if (path === "Transaction") {
    render = <Transaction />;
  } else {
    render = <Statistic />;
  }

  return (
    <Container className="">
      <div className="flex w-4/5 mt-32">
        <div className="flex flex-col items-start w-1/4 pt-24">
          <input className="my-4 text-2xl" type="submit" value="Events" onClick={onClick} onChange={onChange} />
          <input className="my-4 text-2xl" type="submit" value="Registration" onClick={onClick} onChange={onChange} />
          <input className="my-4 text-2xl" type="submit" value="Transaction" onClick={onClick} onChange={onChange} />
          <input className="my-4 text-2xl" type="submit" value="Statistic" onClick={onClick} onChange={onChange} />
        </div>
        <div className="ps-24 pt-8">{render}</div>
      </div>
    </Container>
  );
};

export default Dashboard;

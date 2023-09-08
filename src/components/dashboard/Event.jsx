const Events = ({ event }) => {
  const { name, location, time, date, description } = event;
  console.log(event);
  let loc;
  if (location.length > 30) {
    loc = location.substring(0, 30) + "...";
  }
  return (
    <div className="border h-48 w-[22rem] mb-12 rounded-lg m-4 bg-gray-50 shadow-xl p-6">
      <p className="font-bold text-xl">{name}</p>
      <p>{loc}</p>
      <p className="font-semibold">{time}</p>
      <p>{date}</p>
      <p className="italic">{description}</p>
    </div>
  );
};

export default Events;

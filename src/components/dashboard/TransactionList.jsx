const TransactionList = ({ event }) => {
  const { id, name } = event;
  return (
    <div className="">
      <p className="font-bold text-4xl mb-6">{name}</p>
      <div className="flex">
        <p className="w-40 font-semibold">Event Id</p>
        <p>{id}</p>
      </div>
      <div className="flex">
        <p className="w-40 font-semibold">Status Transaction</p>
        <p>{id}</p>
      </div>
    </div>
  );
};

export default TransactionList;

const RegistrationList = ({ event }) => {
  const { name } = event;

  return (
    <div className="border my-20 h-48 p-6 bg-gray-100 rounded-lg">
      <p className="font-bold text-4xl mb-6">{name}</p>
      <div>
        <div className="flex">
          <p className="w-40 font-semibold">Total Quota</p>
          <p>1000</p>
        </div>
        <div className="flex">
          <p className="w-40 font-semibold">Left Quota</p>
          <p>800</p>
        </div>
        <div className="flex">
          <p className="w-40 font-semibold">User Registered</p>
          <p>200</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationList;

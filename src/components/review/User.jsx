const User = ({ users }) => {
  return (
    <div className="sm:h-72 md:h-60 lg:h-36 h-[24rem] lg:w-24 my-6">
      <div className="flex">
        <p className="font-semibold">{users.name}</p>
      </div>
    </div>
  );
};

export default User;

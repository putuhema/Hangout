const Error = ({ error }) => {
  console.log(error);
  return (
    <div>
      <h1>{error.message}</h1>
    </div>
  );
};

export default Error;

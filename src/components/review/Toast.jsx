const Toast = ({ message }) => {
  return (
    <div className="flex w-60 h-10 bg-red-400 rounded-lg items-center place-content-center fixed top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <span>{message} &#10060;</span>
    </div>
  );
};

export default Toast;

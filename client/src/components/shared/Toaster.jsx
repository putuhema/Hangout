import * as Toast from "@radix-ui/react-toast";
const Toaster = () => {
  return (
    <Toast.Provider>
      <Toast.Root>
        <Toast.Title />
        <Toast.Description />
        <Toast.Action />
        <Toast.Close />
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default Toaster;

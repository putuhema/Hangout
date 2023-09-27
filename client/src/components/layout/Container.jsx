import PropType from "prop-types";
import Navbar from "../shared/Navbar";
import { Toaster } from "../ui/toaster";
import SearchBox from "../shared/SearchBox";

const Container = ({ children }) => {
  return (
    <div>
      <SearchBox />
      <Navbar />
      <main className="px-0 md:px-20 lg:px-0 w-[350px] md:w-[768px] lg:w-[1028px] xl:w-[1280px] mx-auto">
        <div className="mt-20">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};

Container.propTypes = {
  children: PropType.node.isRequired,
};

export default Container;

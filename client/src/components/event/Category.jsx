import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <div className="flex shrink-0 lg:shrink w-[60px] md:w-[100px] group text-center flex-col  items-center gap-2 cursor-pointer">
      <Link to={`/event/category/${category.value}`}>
        <div className="w-14 h-14 bg-background hover:bg-secondary border border-primary dark:border-border rounded-full grid place-content-center">
          <span className="text-primary dark:text-primary-foreground  transform transition-all duration-100 group-hover:-translate-y-[2px]">
            {category.icon}
          </span>
        </div>
      </Link>
      <span className="whitespace-break-spaces text-xs font-bold text-primary dark:text-primary-foreground">
        {category.text}
      </span>
    </div>
  );
};

Category.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
};
export default Category;

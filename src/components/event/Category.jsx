import PropTypes from "prop-types"
import { Link } from "react-router-dom";

const Category = ({ category }) => {
    return (
        <div className="flex shrink-0 lg:shrink w-[100px] text-center flex-col  items-center gap-2 cursor-pointer">
            <Link to={`/event/category/${category.value}`}>
                {/* <img className="w-20 h-20 rounded-full object-fit" src={imgUrl} alt={title} /> */}
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            </Link>
            <span className="whitespace-break-spaces text-xs font-bold">{category.text}</span>
        </div>)
}

Category.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired
}
export default Category;
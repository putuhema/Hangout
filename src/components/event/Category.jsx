import PropTypes from "prop-types"

const Category = ({ imgUrl, title }) => {
    return (
        <div className="flex shrink-0 lg:shrink w-[100px] text-center flex-col  items-center gap-2 cursor-pointer">
            <img className="w-20 h-20 rounded-full object-fit border" src={imgUrl} alt={title} />
            <span className="whitespace-break-spaces text-xs font-bold">{title}</span>
        </div>)
}

Category.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}
export default Category;
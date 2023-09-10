import styles from "./Star.module.css";

const StarRatingTemplate = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button type={styles.button} key={index} className={index <= rating ? "on" : "off"}>
            <span className="star text-xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingTemplate;

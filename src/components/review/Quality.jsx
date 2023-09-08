const Quality = ({ average }) => {
  if (average > 4) {
    return <p className="italic">Mostly Satisfied</p>;
  } else if (average >= 2 && average < 4) {
    return <p className="italic">Satisfied</p>;
  } else {
    return <p className="italic">Less Satisfied</p>;
  }
};

export default Quality;

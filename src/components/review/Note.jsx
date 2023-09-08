const Note = ({ style }) => {
  return (
    <div className={style}>
      <p className="font-thin">rating 1-2 less satisfied</p>
      <p className="font-thin">rating 2-4 satisfied</p>
      <p className="font-thin">rating 4-5 mostly satisfied</p>
    </div>
  );
};

export default Note;

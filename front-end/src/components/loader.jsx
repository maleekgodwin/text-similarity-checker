import style from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.overlay}></div>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;

interface Props{
    contStyle?: string;
    loaderStyle? : string
}

const Loader = ({contStyle, loaderStyle} : Props) => {
  return (
    <div className={` ${contStyle}`}>
      <div className={`animate-spin inline-block border border-[#938d8d] border-b-transparent rounded-[50%] ${loaderStyle}`}></div>
    </div>
  );
};

export default Loader;
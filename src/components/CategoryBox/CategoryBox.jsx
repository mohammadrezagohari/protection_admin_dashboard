import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CategoryBox.css";

const CategotyBox = (props, { children }) => {
  const lblRef = useRef();
  const [checked, setChecked] = useState(false);
  const checkHandler = (el, id) => {
    setChecked((prev) => !prev);
    console.log(el.id);
  };
  const catBoxStyle = {
    border: "1px solid #E9E9E9",
    width: "180px",
    height: "70px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const styleChange = (element) => {
    // let flag= true;
    // if(flag){
    //     console.log(element.target.style.background);
    //     lblRef.current.style.background = '#183087';
    //     lblRef.current.style.color = '#fff';
    //     flag= false;
    //     console.log('khamosh nashod');
    // }
    //else{
    //     lblRef.current.style.background = '#fff';
    //     lblRef.current.style.color = '#183087';
    //     flag= true;
    //     console.log('khamosh shod');
    // }
  };
  return (
    <>
      {/* <input type="checkbox" className='hidden' id={`ctRadio${props.id}`} /> */}
      <label
        ref={lblRef}
        onClick={checkHandler}
        style={catBoxStyle}
        className={` cursor-pointer pr-3 text-darkBlue transition hover:bg-color20% `}
      >
        {/* ${
          checked ? "bg-darkBlue !text-white" : "bg-white text-darkBlue"
        } */}
        {/* <input onChange={styleChange} type="radio" className='hidden' /> */}
        <span
          className="ml-3 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "#F8F8F8" }}
        >
          <img className="w-1/2 " src={props.src} />
        </span>
        <p className="w-max text-sm">{props.name}</p>
        {props.children}
      </label>
    </>
  );
};

export default CategotyBox;

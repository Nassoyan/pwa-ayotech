import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./DropDown";

export default function MenuItems({ items, depthLevel }: any) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  let ref = useRef(null);

  useEffect(() => {
    const handler = (event:any) => {
     if (dropdown && ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);s
     }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
     // Cleanup the event listener
     document.removeEventListener("mousedown", handler);
     document.removeEventListener("touchstart", handler);
    };
   }, [dropdown]);

   const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
   };
   
   const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
   };

  return (
    <li 
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="menu-items" ref={ref}>
      {items.children ? (
        <>
          <button
            aria-expanded={dropdown ? "true" : "false"}
            className="menuitems-buttons header_each_div"
            type="button"
            aria-haspopup="menu"
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            dropdown={dropdown}
            children={items.children}
          />
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
}


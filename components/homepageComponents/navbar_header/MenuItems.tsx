import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./DropDown";

export default function MenuItems({ items, depthLevel }: any) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  let ref = useRef(null);

  useEffect(() => {
    const handler = (event:any) => {
     if (dropdown && ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
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

// import { useState, useEffect, useRef } from "react";

// import Dropdown from "./DropDown";

// const MenuItems = ({ items, depthLevel }:any) => {
//   const [dropdown, setDropdown] = useState(false);

//   let ref = useRef(null);

//   useEffect(() => {
//     const handler = (event:any) => {
//       if (dropdown && ref.current && !ref.current.contains(event.target)) {
//         setDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     document.addEventListener("touchstart", handler);
//     return () => {
//       // Cleanup the event listener
//       document.removeEventListener("mousedown", handler);
//       document.removeEventListener("touchstart", handler);
//     };
//   }, [dropdown]);

//   const onMouseEnter = () => {
//     window.innerWidth > 960 && setDropdown(true);
//   };

//   const onMouseLeave = () => {
//     window.innerWidth > 960 && setDropdown(false);
//   };

//   return (
//     <li
//       className="menu-items"
//       ref={ref}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       {/* if item has url and submenu, we make the button clickable to visit 
//       the url while still showing dropdown on hover. If no url, we only show 
//       hover without linking the button. Else, we render a simple <a> element. 
//       Be aware that they are internal links, so we will use the <Link> component from react-router. Here, we are using the <a> for simplicity. */}
//       {items.url && items.children ? (
//         <>
//           <button
//             type="button"
//             aria-haspopup="menu"
//             aria-expanded={dropdown ? "true" : "false"}
//             // onClick={() => setDropdown((prev) => !prev)}
//           >
//             <a href={items.url}>{items.title}</a>
//             {/* {items.title}{" "} */}
//             {depthLevel > 0 ? (
//               <span>&raquo;</span>
//             ) : (
//               <span
//                 className={`arrow${
//                   items.url && items.children ? " custom" : ""
//                 }`}
//               />
//             )}
//           </button>
//           <Dropdown
//             depthLevel={depthLevel}
//             submenus={items.children}
//             dropdown={dropdown}
//           />
//         </>
//       ) : !items.url && items.children ? (
//         <>
//           <button
//             type="button"
//             aria-haspopup="menu"
//             aria-expanded={dropdown ? "true" : "false"}
//             onClick={() => setDropdown((prev) => !prev)}
//           >
//             {/* <a href="/#">{items.title}</a> */}
//             {items.title}{" "}
//             {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
//           </button>
//           <Dropdown
//             depthLevel={depthLevel}
//             submenus={items.children}
//             dropdown={dropdown}
//           />
//         </>
//       ) : (
//         <a href={items.url}>{items.title}</a>
//       )}
//     </li>
//   );
// };

// export default MenuItems;


// import { useState, useEffect, useRef } from "react";

// import Dropdown from "./DropDown";

// const MenuItems = ({ items, depthLevel }:any) => {
//   const [dropdown, setDropdown] = useState(false);
// console.log(items, "cdcd");

//   let ref = useRef(null);

//   useEffect(() => {
//     const handler = (event:any) => {
//       if (dropdown && ref.current && !ref.current.contains(event.target)) {
//         setDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     document.addEventListener("touchstart", handler);
//     return () => {
//       // Cleanup the event listener
//       document.removeEventListener("mousedown", handler);
//       document.removeEventListener("touchstart", handler);
//     };
//   }, [dropdown]);

//   const onMouseEnter = () => {
//     window.innerWidth > 960 && setDropdown(true);
//   };

//   const onMouseLeave = () => {
//     window.innerWidth > 960 && setDropdown(false);
//   };

//   return (
//     <li
//       className="menu-items"
//       ref={ref}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       {/* if item has url and submenu, we make the button clickable to visit 
//       the url while still showing dropdown on hover. If no url, we only show 
//       hover without linking the button. Else, we render a simple <a> element. 
//       Be aware that they are internal links, so we will use the <Link> component from react-router. Here, we are using the <a> for simplicity. */}
//       {items.url && items.children ? (
//         <>
//           <button
//             type="button"
//             aria-haspopup="menu"
//             aria-expanded={dropdown ? "true" : "false"}
//             // onClick={() => setDropdown((prev) => !prev)}
//           >
//             <a href={items.url}>{items.title}</a>
//             {/* {items.title}{" "} */}
//             {depthLevel > 0 ? (
//               <span>&raquo;</span>
//             ) : (
//               <span
//                 className={`arrow${
//                   items.url && items.children ? " custom" : ""
//                 }`}
//               />
//             )}
//           </button>
//           <Dropdown
//             depthLevel={depthLevel}
//             submenus={items.children}
//             dropdown={dropdown}
//           />
//         </>
//       ) : !items.url && items.children ? (
//         <>
//           <button
//             type="button"
//             aria-haspopup="menu"
//             aria-expanded={dropdown ? "true" : "false"}
//             onClick={() => setDropdown((prev) => !prev)}
//           >
//             {/* <a href="/#">{items.title}</a> */}
//             {items.title}{" "}
//             {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
//           </button>
//           <Dropdown
//             depthLevel={depthLevel}
//             submenus={items.children}
//             dropdown={dropdown}
//           />
//         </>
//       ) : (
//         <a href={items.url}>{items.title}</a>
//       )}
//     </li>
//   );
// };

// export default MenuItems;

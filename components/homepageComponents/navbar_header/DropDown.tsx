import MenuItems from "./MenuItems";

const Dropdown = ({ children, dropdown, depthLevel }: any) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
    {children.map((children: any, index: number) => (
        <MenuItems depthLevel={depthLevel} items={children} key={index} />
      ))}
    </ul>
  );
};

export default Dropdown;

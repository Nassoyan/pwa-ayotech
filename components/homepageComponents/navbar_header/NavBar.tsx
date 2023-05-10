import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import {
  MenuProps,
  asyncMenuItemsThunk,
  menuDataSelector,
} from "@/redux/slices/menuItems/menuItems";
import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const menuData = useAppSelector(menuDataSelector);
  const [data, setData] = useState<any>();


  useEffect(() => {
    dispatch(asyncMenuItemsThunk());
  }, []);

  useEffect(() => {
    setData(menuData);
  }, [menuData]);

  return (
    <nav>
      <ul style={{ display: "flex", gap: "30px" }}>
        {data?.map((menu: MenuProps) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={menu.id} depthLevel={depthLevel}/>;
        })}
      </ul>
    </nav>
  );
}

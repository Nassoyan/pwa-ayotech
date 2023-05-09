import Image from "next/image";
import wilmaxLogo from "../../public/images/logo/Wilmax_square.jpg";
import pasabahceLogo from "../../public/images/logo/pasabahce_logo_2.png";
import agaLogo from "../../public/images/logo/agaLogo copy.jpg";
import bormioliLogo from "../../public/images/logo/download.png";
import promsizeLogo from "../../public/images/logo/promsize.jpg";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import AddToCartSVG from "@/public/svg/addToCart";
import { quantitySelector } from "@/redux/slices/cart/addToCartSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  MenuProps,
  asyncMenuItemsThunk,
  menuDataSelector,
} from "@/redux/slices/menuItems/menuItems";
import  Router  from "next/router";

function Header() {
  const [data, setData] = useState([]);
  const quantity = useAppSelector(quantitySelector);
  const dispatch = useAppDispatch();
  const menuData = useAppSelector(menuDataSelector);

  let linkedElement;
  if(typeof document !== 'undefined') {
    linkedElement = document.querySelector(".container :nth-child(2)")
}

  // console.log(menuData[1].title);
  
  // useLayoutEffect(() => {
  //   Router.push()
  // }, [linkedElement])

  useEffect(() => {
    setData(menuData);
  }, [menuData]);

  useEffect(() => {
    dispatch(asyncMenuItemsThunk());
  }, []);

  return (
    <div className="header_wrapper">
      <div className="header_color">
        <div className="container">
          {data.map((item: MenuProps) => {
            return (
              <div
                style={{ color: "red" }}
                className="header_each_div"
                key={item.id}
              >
                {item.title}
              </div>
            );
          })}

          <Link href="/wishlist" className="header_each_div wishlist">
            Wishlist
          </Link>
          <Link
            href="/register"
            style={{ cursor: "pointer" }}
            className="header_each_div"
          >
            Log In
          </Link>
        </div>
      </div>
      <div className="header_belowside ">
        <h1>PWA Ayotech</h1>
        <Link href="/cart" className="addtocart">
          <span>
            <AddToCartSVG />
          </span>
          <div className="addtocart_quantity">{quantity}</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

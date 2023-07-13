import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import AddToCartSVG from "@/public/svg/addToCart";
import { quantitySelector } from "@/redux/slices/cart/addToCartSlice";
import NavBar from "./NavBar";
import { useEffect, useRef, useState } from "react";
import { asyncGetCartThunk } from "@/redux/slices/cart/getCart";

function Header() {
  const quantity = useAppSelector(quantitySelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //this is for showing quantity in headers icon cart
    dispatch(
      asyncGetCartThunk({ cart_token: localStorage.getItem("cart_token") })
    );
  }, []);


  return (
    <div className="header_wrapper">
      <div className="header_color">
        <div className="container">
          <NavBar />

          <div style={{ display: "flex", gap: "25px" }}>
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
      <div style={{ width: "5%", marginLeft: "70px" }}>
        <Link href="/">Home</Link>
      </div>
      <div style={{ width: "5%", marginLeft: "70px", marginTop:"15px" }}>
        <Link href="/product">Products</Link>
      </div>
    </div>
  );
}

export default Header;

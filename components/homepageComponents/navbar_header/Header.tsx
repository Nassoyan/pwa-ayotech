import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import AddToCartSVG from "@/public/svg/addToCart";
import { quantitySelector } from "@/redux/slices/cart/addToCartSlice";
import NavBar from "./NavBar";

function Header() {
  const quantity = useAppSelector(quantitySelector);

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
      <Link
        href="/product"
        style={{
          paddingLeft: "70px",
          fontSize: "25px",
          textDecoration: "underLine",
        }}
      >
        Products
      </Link>
    </div>
  );
}

export default Header;

import Image from "next/image";
import wilmaxLogo from "../../public/images/logo/Wilmax_square.jpg";
import pasabahceLogo from "../../public/images/logo/pasabahce_logo_2.png";
import agaLogo from "../../public/images/logo/agaLogo copy.jpg";
import bormioliLogo from "../../public/images/logo/download.png";
import promsizeLogo from "../../public/images/logo/promsize.jpg";

import Link from "next/link";
import { useAppSelector } from "@/redux/features/hooks";
import AddToCartSVG from "@/public/svg/addToCart";
import { quantitySelector } from "@/redux/slices/cart/addToCartSlice";

function Header() {
  const quantity = useAppSelector(quantitySelector)

 

  return (
    <div className="header_wrapper">
      <div className="header_color">
        <div className="container">
          <div className="header_each_div">
            <span>Mon-Sat:</span>
            <span>10:00 AM - 18:30 PM</span>
          </div>
          <div className="header_each_div visit-our-showroom">
            <span>
              Visit our showroom in Yerevan Trade Center: D61 showroom{" "}
            </span>
          </div>
          <div className="header_each_div">
            <span>Contact with Us: +(374) 94 34 00 01</span>
          </div>

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

import React, { useEffect } from "react";
import Slider from "react-slick";
import Image from "next/legacy/image";
import Heart from "@/public/svg/Heart";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import {
  Product,
  loadingSelector,
} from "@/redux/slices/wishlist/getProductSlice";
import { addProductToWishlistThunk } from "@/redux/slices/wishlist/addProductSlice";
import { asyncAddToCartThunk } from "@/redux/slices/cart/addToCartSlice";
import { MoonLoader } from "react-spinners";
import {
  getProductSelector,
  getProductThunk,
} from "@/redux/slices/wishlist/getProductSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function NewProdSlider() {
  const dispatch = useAppDispatch();
  const data: Product[] = useAppSelector(getProductSelector);
  let loading = useAppSelector(loadingSelector);
  const authorization = Cookies.get("authorized");
  const router = useRouter()
  

  useEffect(() => {
    dispatch(getProductThunk());
  }, []);

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <span className="SliderNextArrow">
        <svg
          onClick={onClick}
          width={13}
          height={22}
          viewBox="0 0 13 22"
          fill="none"
        >
          <path d="M1 21l10-10L1 1" stroke="#1F1F24" strokeWidth={2} />
        </svg>
      </span>
    );
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <span className="SliderPrevArrow">
        <svg
          onClick={onClick}
          width={13}
          height={22}
          viewBox="0 0 13 22"
          fill="none"
        >
          <path d="M12 1L2 11l10 10" stroke="#1F1F24" strokeWidth={2} />
        </svg>
      </span>
    );
  }

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
    <h1 style={{paddingLeft:"50px"}}>Product Slider</h1>
      {loading ? (
        <Slider className="newProduct_slider" {...settings}>
          {data?.map((el: Product) => {
            return (
              <div key={el.id} className="each_new_prodSlider">
                <div className="each_new_prodSlider_image">
                  <Image
                    src={el.image}
                    layout="intrinsic"
                    width={192}
                    height={192}
                    objectFit="cover"
                    alt="prod"
                    loading="lazy"
                  />
                </div>
                <span
                  onClick={() => {
                   !authorization && dispatch(
                      addProductToWishlistThunk({
                        product_id: el.id,
                      })
                    );
                  }}
                >
                  <Heart />
                </span>
                <div
                  onClick={() => {
                    if(authorization == undefined) {
                      router.push("/register")
                    } else {
                      dispatch(
                        asyncAddToCartThunk({
                          product_id: el.id,
                          quantity: 1,
                          cart_token: localStorage
                            .getItem("cart_token")
                            ?.toString(),
                        })
                      );
                    }
                  }}
                  className="plus-sign"
                >
                  +
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <MoonLoader color="black" size={80} />
        </div>
      )}
    </>
  );
}

export default NewProdSlider;

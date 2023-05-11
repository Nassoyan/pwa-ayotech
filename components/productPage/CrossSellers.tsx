import Heart from "@/public/svg/Heart";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { asyncAddToCartThunk } from "@/redux/slices/cart/addToCartSlice";
import { addProductToWishlistThunk } from "@/redux/slices/wishlist/addProductSlice";
import { Product, getProductSelector, getProductThunk } from "@/redux/slices/wishlist/getProductSlice";
import Image from "next/legacy/image";
import React, { useEffect } from "react";
import Slider from "react-slick";

export default function CrossSellers({dataId}:any) {
    const dispatch = useAppDispatch();
    
    // useEffect(() => {
    //     dispatch(getProductThunk());
    //   }, []);
    
console.log(dataId);


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
    dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  adaptiveHeight: true
,
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
    <div className="crossellers_container">
        <hr></hr>
      <h2>CrossSeller Products</h2>
      <Slider className="crossSeller_slider" {...settings}>
        {dataId?.crossSellers?.map((dataId:any) => {
            return (
                <div key={dataId.id} className="each_new_prodSlider">
            <div className="each_new_prodSlider_image">
              <Image
                src={dataId.image}
                layout="intrinsic"
                width={192}
                height={280}
                objectFit="contain"
                alt="prod"
                loading="lazy"
              />
            </div>
            <span
              onClick={() => {
                dispatch(
                  addProductToWishlistThunk({
                    product_id: dataId.id,
                  })
                );
              }}
            >
              <Heart />
            </span>
            <div
              onClick={() => {
                  dispatch(
                    asyncAddToCartThunk({
                      product_id: dataId.id,
                      quantity: 1,
                      cart_token: localStorage
                        .getItem("cart_token")
                        ?.toString(),
                    })
                  );
                }
              }
              className="plus-sign"
            >
              +
            </div>
            <div>{dataId.price}</div>
          </div>
            )
        })}
      </Slider>
    </div>
  );
}

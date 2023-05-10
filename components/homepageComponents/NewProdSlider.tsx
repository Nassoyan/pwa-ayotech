import React, { useEffect } from "react";
import Slider from "react-slick";
import Image from "next/legacy/image";
import Heart from "@/public/svg/Heart";
import {
  getProductSelector,
  getProductThunk,
} from "@/redux/slices/wishlist/getProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { Product } from "@/redux/slices/wishlist/getProductSlice";
import addProductSlice, {
  addProductToWishlistThunk,
} from "@/redux/slices/wishlist/addProductSlice";
import { asyncAddToCartThunk } from "@/redux/slices/cart/addToCartSlice";
import { dataSelector, tokenSelector } from "@/redux/slices/cart/getCart";
import { statusSelector } from "@/redux/slices/authentication/loginSlice";
import Router from "next/router";



function NewProdSlider() {
  const dispatch = useAppDispatch();
  const data: Product[] = useAppSelector(getProductSelector);
  const loginStatus = useAppSelector(statusSelector);
  

  useEffect(() => {
    dispatch(getProductThunk());
  }, [dispatch]);

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
    <Slider className="newProduct_slider" {...settings}>
      {data?.map((el: Product) => {
        return (
          <div key={el.id} className="each_new_prodSlider">
            <div className="each_new_prodSlider_image">
              <Image
                src={el.image}
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
                    product_id: el.id,
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
                      product_id: el.id,
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
          </div>
        );
      })}
    </Slider>
  );
}

export default NewProdSlider;

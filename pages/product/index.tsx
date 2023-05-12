import React, { useEffect } from "react";
import {
  Product,
  getProductSelector,
  getProductThunk,
} from "@/redux/slices/wishlist/getProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import Link from "next/link";
import Image from "next/legacy/image";
import Heart from "@/public/svg/Heart";
import { asyncAddToCartThunk } from "@/redux/slices/cart/addToCartSlice";
import Router from "next/router";

function Product() {
  const dispatch = useAppDispatch();
  const data: Product[] = useAppSelector(getProductSelector);

  useEffect(() => {
    dispatch(getProductThunk());
  }, []);
  return (
    <>
      <Link
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1470px",
          padding: "10px 50px 10px 70px",
          margin: "0 auto",
          cursor: "pointer",
        }}
        href="/"
      >
        &#x2190; Go Back
      </Link>
      <div className="product_container">
        {data?.map((item: Product) => {
          return (
            <div
              onClick={() => {
                Router.push(`product/${item.id}`);
              }}
              style={{
                position: "relative",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              key={item.id}
              className="product_box"
            >
              <Image
                src={item.image}
                layout="intrinsic"
                width={192}
                height={280}
                objectFit="contain"
                alt="prod"
                loading="lazy"
              />
              <span>{item.price}</span>
              <span
                style={{
                  color: item.stock === "In stock" ? "yellowgreen" : "darkred",
                }}
              >
                {item.stock}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
              >
                <Heart />
              </span>
              <div
                className={`${
                  item.stock === "In stock" ? "plus-sign" : "out_of_stock"
                }`}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "5px",
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      asyncAddToCartThunk({
                        product_id: item.id,
                        quantity: 1,
                        cart_token: localStorage
                          .getItem("cart_token")
                          ?.toString(),
                      })
                    );
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                >
                  +
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;

import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { statusSelector } from "@/redux/slices/authentication/loginSlice";
import { asyncDeleteCartThunk } from "@/redux/slices/cart/deleteCart";
import { asyncEditCartThunk } from "@/redux/slices/cart/editCartItems";
import { asyncGetCartThunk } from "@/redux/slices/cart/getCart";
import Image from "next/legacy/image";
import React, { useEffect, useLayoutEffect, useState } from "react";

interface Product {
  images: string[];
  product: number;
  quantity: number;
  id?: number;
}

type NewProductItemProps = {
  product: Product;
  deleteItem():void
};

export default function CartMappedData(
  props: NewProductItemProps,
  { deleteItem }: any
) {
  const product: Product = props.product;

  const quantity = product.quantity;
  const [count, setCount] = useState(quantity);
  const token = localStorage.getItem("cart_token");

  const dispatch = useAppDispatch();

  function handleCountPlus() {
    setCount((prev: number) => {
      return prev + 1;
    });
  }
  function handleCountMinus() {
    setCount((prev: number) => {
      return prev - 1;
    });
  }

  return (
    <div className="getCart_each_container" key={product.id}>
      <Image
        src={product.images[0]}
        layout="intrinsic"
        width={192}
        height={280}
        objectFit="contain"
        alt="prod"
        loading="lazy"
      />
      <span
        onClick={() => {
          dispatch(
            asyncDeleteCartThunk({
              item_id: Number(product.id),
              cart_token: token,
            })
          ).then(() =>
            dispatch(
              asyncGetCartThunk({
                cart_token: token,
              })
            )
          );
          props.deleteItem
        }}
      >
        Delete
      </span>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>quantity({count})</span>
        <span
          onClick={() => {
            handleCountPlus();
            dispatch(
              asyncEditCartThunk({
                item_id: Number(product.id),
                cart_token: token,
                quantity: count + 1,
              })
            ).then(() => {
              dispatch(
                asyncGetCartThunk({
                  cart_token: token,
                })
              );
            });
          }}
          style={{
            padding: "5px",
            fontSize: "20px",
            color: "lightGreen",
            cursor: "pointer",
          }}
        >
          +
        </span>
        /
        <span
          onClick={() => {
            if (count <= 1) {
              return false;
            } else {
              dispatch(
                asyncEditCartThunk({
                  item_id: Number(product.id),
                  cart_token: token,
                  quantity: count - 1,
                })
              ).then(() => {
                dispatch(
                  asyncGetCartThunk({
                    cart_token: token,
                  })
                );
              });
            }
            handleCountMinus();
          }}
          style={{
            padding: "5px",
            fontSize: "20px",
            color: "yellow",
            cursor: "pointer",
          }}
        >
          {" "}
          -
        </span>
      </div>
    </div>
  );
}
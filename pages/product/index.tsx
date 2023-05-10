import React, { useEffect } from "react";
import { Product, getProductSelector, getProductThunk } from "@/redux/slices/wishlist/getProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import Link from "next/link";
import Image from "next/legacy/image";



type NewProductItemsProps = {
  product: Product;
};


function Product() {
  const dispatch = useAppDispatch()
  const data: Product[] = useAppSelector(getProductSelector);
// console.log(data);


  useEffect(() => {
    dispatch(getProductThunk());
  }, []);
  return (
    <>
      <Link style={{ paddingLeft: "70px" }} href="/">
        &#x2190; Go Back
      </Link>
      <div className="product_container">
          {data?.map((item:Product) => {
            return (
              <div key={item.id} className="product_box">
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
              <span>{item.stock}</span>
              </div>
            )
          })}
      </div>
    </>
  );
}

export default Product;

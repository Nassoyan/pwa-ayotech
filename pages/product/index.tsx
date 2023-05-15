import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import Heart from "@/public/svg/Heart";
import { asyncAddToCartThunk } from "@/redux/slices/cart/addToCartSlice";
import Router from "next/router";
import { Product } from "@/redux/slices/wishlist/getProductSlice";
import { useAppDispatch } from "@/redux/features/hooks";

interface Links {
  [key: string]: string | null | boolean;
}

interface Data {
  data: Product[];
  links?: {
    [key: string]: string | null;
  };
  meta: {
    [key: string]: string | number | undefined | Links[];
  };
}

function Product() {
  const [data, setData] = useState<Data | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(15);

  const dispatch = useAppDispatch()

  const pageNumbers: number[] = [];
  const totalPosts = data?.meta.total;

  let prev: any = data?.links?.prev;
  let next: any = data?.links?.next;

  const previousPage = (): void => {
    if (prev) {
      fetch(prev)
        .then((res) => res.json())
        .then((req) => setData(req));
    } else {
      return;
    }
  };

  const nextPage = (): void => {
    if (next) {
      fetch(next)
        .then((res) => res.json())
        .then((req) => setData(req));
    } else {
      return;
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetch(`https://pwaback.ayotech.am/api/products?page=${pageNumber}`)
      .then((res) => res.json())
      .then((req) => setData(req));
  };

  for (let i = 1; i <= Math.ceil(Number(totalPosts) / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetch(`https://pwaback.ayotech.am/api/products?page=${currentPage}`)
      .then((res) => res.json())
      .then((req) => setData(req));
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
      {data ? (
        <div className="product_container">
          {data?.data?.map((item: any) => {
            return (
              <div
                onClick={() => {
                  Router.push(`product/${item.id}`);
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
                    color:
                      item.stock === "In stock" ? "yellowgreen" : "darkred",
                  }}
                >
                  {item.stock}
                </span>
                <span
                className="heart_product_page" >
                  <Heart />
                </span>
                <div
                  className={`${
                    item.stock === "In stock" ? "plus-sign" : "out_of_stock"
                  }`}
                >
                  <div
                  className="addToCart_icon"
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
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="loading">Loading...</h1>
      )}

      <div className="pagination_container">
        <div onClick={previousPage} className="page_number">
          &larr;
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {pageNumbers.map((number) => (
            <div
              key={number}
              onClick={() => paginate(number)}
              className="page_number"
            >
              {number}
            </div>
          ))}
        </div>

        <div onClick={nextPage} className="page_number">
          &rarr;
        </div>
      </div>
    </>
  );
}

export default Product;

// 

import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import Image from "next/legacy/image";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

function ScrollPopUp() {
  const [state, setState] = useState([]); //making copy of fetched data

  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.getCart.cart_token);
  const data = useAppSelector((state: any) => state.getCart.data?.items);
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].price;
  }

  useEffect(() => {
    if (data.length > 4) {
      setState(data.slice(0, 4));
    } else {
      setState(data);
    }
  }, [data]);

  const [prevScrollY, setPrevScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const footerHeight = document.getElementById("footer")?.offsetHeight || 0;
 
      if (currentScrollY > prevScrollY) {
        setShowPopup(true); // Hide the pop-up when scrolling down
      } else if (currentScrollY < prevScrollY) {
        setShowPopup(false); // Show the pop-up when scrolling up
      }

      if (currentScrollY + window.innerHeight >= document.body.offsetHeight - footerHeight) {
        setShowPopup(false); // Hide the pop-up when scrolling down to the footer
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <>
      {showPopup && (
        <div
          style={{ height: showPopup ? "200px" : "" }}
          className="scroll_popup"
        >
          <div className="scroll_carts">
            {state?.map((item: any) => {
              return (
                <div key={item.id} className="scroll_products">
                  <Image
                    src={item.images[0]}
                    layout="intrinsic"
                    width={190}
                    height={150}
                    objectFit="cover"
                    alt="prod"
                    loading="lazy"
                  />
                </div>
              );
            })}
            {data.length > 4 && (
              <div className="scroll_quantity">
                <Link href="/cart">+{data.length - data.slice(0, 4).length}</Link>
              </div>
            )}
          </div>
          <div className="scroll_selected_price">
            <p>Selected Items ({data.length})</p>
            <p>Total {total}$</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ScrollPopUp;

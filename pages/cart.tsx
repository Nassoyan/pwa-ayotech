import CartMappedData from "@/components/homepageComponents/CartMappedData";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { RootState } from "@/redux/features/store";
import { asyncEmptyCartThunk } from "@/redux/slices/cart/emptyAllItems";
import { asyncGetCartThunk } from "@/redux/slices/cart/getCart";
import Link from "next/link";
import { useEffect, useState } from "react";

function AddToCart() {
  const [state, setState] = useState([]); //making copy of fetched data

  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.getCart.cart_token);

  const data = useAppSelector((state: RootState) => state.getCart.data?.items); //getting data from redux and passing to the state

  useEffect(() => {
    setState(data);
  }, [data]);

  useEffect(() => {
    dispatch(
      asyncGetCartThunk({
        cart_token: token,
        data: [],
      })
    );
  }, []);

  function deleteItem(id: number) {
    setState((prev: any) => {
      return prev.filter((t: any) => t.id !== id);
    });
  }

  function emptyCart() {
    setState([]);
  }

  function handleEmptyCartClick() {
    dispatch(asyncEmptyCartThunk({ cart_token: token })).then(() => {
      dispatch(
        asyncGetCartThunk({
          cart_token: token,
          data: [],
        })
      );
      emptyCart();
    });
  }
  return (
    <div className="addToCart">
      <div className="addToCart_container">
        <Link href="/" className="addToCart-back">
          Back
        </Link>
        <p className="added_products">Your added Products</p>
        <span className="empty_all_items" onClick={handleEmptyCartClick}>
          Empty all items
        </span>
        <div className="added_products_container">
          {state?.map((item: any) => {
            return (
              <CartMappedData
                deleteItem={(item: any) => deleteItem(item)}
                key={item.id}
                product={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddToCart;

import Carrrrt from "@/components/homepageComponents/Carrrrt";
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
      return prev.filter((t:any) => t.id !== id);
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
        <h2
          onClick={handleEmptyCartClick}
          style={{ color: "red", cursor: "pointer" }}
        >
          Empty all items
        </h2>
        <div className="added_products_container">
          {state?.map((item: any) => {
            return (
              <CartMappedData
                deleteItem
                ={(item: any) => deleteItem(item.id)}
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

// <div className="getCart_each_container" key={item.id}>
//   <Image
//     src={item.images[0]}
//     layout="intrinsic"
//     width={192}
//     height={280}
//     objectFit="contain"
//     alt="prod"
//     loading="lazy"
//   />
//   <span
//     onClick={() => {
//       dispatch(
//         asyncDeleteCartThunk({
//           item_id: item.id,
//           cart_token: token,
//         })
//       ).then(() =>
//         dispatch(asyncGetCartThunk({ cart_token: token }))
//       );
//       deleteItem(item.id);
//     }}
//   >
//     Delete
//   </span>
//   <div style={{ display: "flex", alignItems: "center" }}>
//     <span>quantity({quantity})</span>
//     <span
//       onClick={() => {
//         dispatch(
//           asyncEditCartThunk({
//             item_id: item.id,
//             cart_token: token,
//             quantity: 4,
//           })
//         );
//         quantityPlus(item);
//       }}
//       style={{
//         padding: "5px",
//         fontSize: "20px",
//         color: "lightGreen",
//         cursor: "pointer",
//       }}
//     >
//       +
//     </span>
//     /
//     <span
//       style={{
//         padding: "5px",
//         fontSize: "20px",
//         color: "yellow",
//         cursor: "pointer",
//       }}
//     >
//       {" "}
//       -
//     </span>
//   </div>
// </div>

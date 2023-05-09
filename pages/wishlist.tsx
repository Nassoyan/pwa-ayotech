import Heart from '@/public/svg/Heart';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks'
// import { Product } from '@/redux/slices/addProductSlice';
// import { getProductThunk, updateWishlist } from '@/redux/slices/getProductSlice';
// import { asyncAddToWishlist } from '@/redux/slices/wishlistSlice';
// import { RootState } from '@/redux/store';
import Image from "next/legacy/image";
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react'

// type NewProductItemsProps = {
//   product: Product
// }

// function Product(props:NewProductItemsProps) {
//   const dispatch = useAppDispatch()
//   const product:Product = props.product

//   return (
//     <div key={product.id} className='each_prod_slider'>
//       <div>
//         <Image
//           className="img"
//           height={1}
//           width={1}
//           layout="responsive"
//           alt="products"
//           objectFit="contain"
//           src={product?.images[0]}
//         />
//         <span
//           className={product.is_wished ? "color" : ""}
//           onClick={() => {
//             dispatch(updateWishlist(product.id))
//             dispatch(
//               asyncAddToWishlist({
//                 product_id: product.id,
//               })
//             )
//           }}
//         >
//           <Heart />
//         </span>
//       </div>
//       <div className='newprod_text'>{product.name}</div>
//       <div>{product.price}</div>
//       <div>{product.price}</div>
//     </div>
//   );
// }

// const MemoizedProduct = React.memo(Product);

function Wishlist() {
  // const dispatch = useAppDispatch();
  // const data:Product[] = useAppSelector((state: RootState) => state.getProduct.data);
  
  // useEffect(() => {
  //   dispatch(getProductThunk());
  // }, []);

  return (
    <div className='wishlist_wrapper'>
      <div className='wishlist_container'>
        <Link href="/" className='wishlist-back'>Back</Link>
        <p className='saved_products'>Your saved Products</p>

        <div className='products_container'>
          {/* {data?.map((el: Product) => {
            return <MemoizedProduct key={el.id} product={el} />;
          })} */}
        </div>
      </div>
    </div>
  );
}

 export default Wishlist

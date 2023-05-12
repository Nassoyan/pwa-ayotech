import CrossSellers from "@/components/productPage/CrossSellers";
import UpSellers from "@/components/productPage/UpSellers";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { asyncReviewThunk } from "@/redux/slices/review/review";
import {
  Product,
  getProductSelector,
  getProductThunk,
} from "@/redux/slices/wishlist/getProductSlice";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface Comment {
  id: number;
  text: string;
  rating: number;
}

function ProductReview() {
  const router = useRouter();
  const productId = router.query.productId;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const data: Product[] = useAppSelector(getProductSelector);
  const dataId: any = data.find(
    (item: Product) => item.id === Number(productId)
  );

  useEffect(() => {
    dispatch(getProductThunk());
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() !== "" && rating > 0) {
      const newComment: Comment = { id: Date.now(), text, rating };
      setComments([...comments, newComment]);
      setText("");
      setRating(0);
      inputRef.current?.focus();
      dispatch(
        asyncReviewThunk({
          product_id: dataId.id,
          comment: text,
          rating: rating,
        })
      );
    }
  }

  function handleDelete(id: number) {
    setComments(comments.filter((comment) => comment.id !== id));
    setCount(() => count - 1);
  }

  function handleRatingChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRating(parseInt(event.target.value, 10));
  }

  return (
    <>
      <div className="productId_container">
        <div className="productId_leftSide">
          <p>{dataId?.title}</p>
          <div className="">
            <Image
              src={dataId?.image}
              layout="intrinsic"
              width={200}
              height={280}
              objectFit="contain"
              alt="prod"
              loading="lazy"
            />
          </div>
          <div>price-{dataId?.price}</div>
          <div>{dataId?.stock}</div>
        </div>

        <div className="review_box">
          <form onSubmit={handleSubmit}>
            <div className="rating_box">
              <label className="comments">Մեկնաբանություններ ({count})</label>
              <div className="rating_nums">
                rate:
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  onChange={handleRatingChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  onChange={handleRatingChange}
                />
              </div>
            </div>
            <textarea
              ref={inputRef}
              value={text}
              onChange={handleChange}
              placeholder="Մեկնաբանություններ"
            ></textarea>
            <div>
              <button type="submit">հաստատել </button>
            </div>
          </form>
          <div className="comment_list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.text}</p>
                <button onClick={() => handleDelete(comment.id)}>Ջնջել</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CrossSellers dataId={dataId} />
      <UpSellers dataId={dataId} />
    </>
  );
}

export default ProductReview;

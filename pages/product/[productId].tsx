import CrossSellers from "@/components/productPage/CrossSellers";
import UpSellers from "@/components/productPage/UpSellers";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import {
  Product,
  getProductSelector,
  getProductThunk,
} from "@/redux/slices/wishlist/getProductSlice";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Comment {
  id: number;
  text: string;
}

function ProductReview() {
  const router = useRouter();
  const productId = router.query.productId;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0)

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
    if (text.trim() !== "") {
      const newComment: Comment = { id: Date.now(), text };
      setComments([...comments, newComment]);
      setText("");
      setCount(() => count+1)
    }
  }

  function handleDelete(id: number) {
    setComments(comments.filter((comment) => comment.id !== id));
    setCount(() => count-1)
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
            <label className="comments">Մեկնաբանություններ ({count})</label>
            <textarea
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

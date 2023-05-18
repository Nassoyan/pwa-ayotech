import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import {
  PostProps,
  Posts,
  asyncPostsThunk,
  loadingSelector,
  postSelector,
} from "@/redux/slices/blogposts/postSlice";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MoonLoader } from "react-spinners";

interface Data {
  data: Posts[];
}

function BlogPost() {
  const dispatch = useAppDispatch();
  const data: Posts[] = useAppSelector(postSelector);
  let loading = useAppSelector(loadingSelector);

  useEffect(() => {
    dispatch(asyncPostsThunk());
  }, []);
  return (
    <div className="blogpost-container">
      <h1>Blog Posts</h1>
      {loading ? (
        <div className="blogpost-box">
          {data?.data?.map((item: Posts) => {
            return (
              <div key={item.id} className="each-blogpost">
                {item.title}
                <Image
                  src={item.image}
                  layout="intrinsic"
                  width={192}
                  height={280}
                  objectFit="contain"
                  alt="prod"
                  loading="lazy"
                />
                <Link href={item.link}>Visit website</Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <MoonLoader color="black" size={80} />
        </div>
      )}

      <hr></hr>
    </div>
  );
}

export default BlogPost;

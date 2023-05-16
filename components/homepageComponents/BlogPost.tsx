import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import {
  PostProps,
  Posts,
  asyncPostsThunk,
  postSelector,
} from "@/redux/slices/blogposts/postSlice";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect } from "react";

interface Data {
  data: Posts[]
}

function BlogPost() {
  const dispatch = useAppDispatch();
  const data: Posts[] = useAppSelector(postSelector);
  console.log(data);

  useEffect(() => {
    dispatch(asyncPostsThunk());
  }, []);
  return (
    <div className="blogpost-container">
      <h1>Blog Posts</h1>
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
        <hr></hr>
    </div>
  );
}

export default BlogPost;

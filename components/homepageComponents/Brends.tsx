import React, { useEffect } from "react";
import Slider from "react-slick";
import Image from "next/legacy/image";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { Brands, asyncGetBrendsThunk, brandsDataSelector } from "@/redux/slices/brendSlider/brandSlice";
// import Heart from "@/public/svg/Heart";



function Brands() {
  
    const dispatch = useAppDispatch()
    const brandData = useAppSelector(brandsDataSelector)
    
  useEffect(() => {
    dispatch(asyncGetBrendsThunk());
  }, [dispatch]);

  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <span className="SliderNextArrow">
        <svg
          onClick={onClick}
          width={13}
          height={22}
          viewBox="0 0 13 22"
          fill="none"
        >
          <path d="M1 21l10-10L1 1" stroke="#1F1F24" strokeWidth={2} />
        </svg>
      </span>
    );
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <span className="SliderPrevArrow">
        <svg
          onClick={onClick}
          width={13}
          height={22}
          viewBox="0 0 13 22"
          fill="none"
        >
          <path d="M12 1L2 11l10 10" stroke="#1F1F24" strokeWidth={2} />
        </svg>
      </span>
    );
  }

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    <hr style={{margin:"20px"}}></hr>
    <h1 className="container brands_cont">Brandsp</h1>
        <Slider className="brands_slider" {...settings}>
        {brandData?.map((item:Brands) => {
            return (
                <div key={item.id} className="each_brand_container">
                    <Image
                    src={`${item.logo}`}
                    layout="intrinsic"
                    width={190}
                    height={280}
                    objectFit="contain"
                    alt="prod"
                    loading="lazy"
                />
                <div className="brands_name">
                    <p>{item.name}</p>
                </div>
                </div>
            )
        })}
        </Slider>
    </>
  );
}

export default Brands;

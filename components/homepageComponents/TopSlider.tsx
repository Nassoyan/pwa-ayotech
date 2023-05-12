import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import sandStone from "../../public/images/bannerSlideImage/SandStone.png";
import slateStone from "../../public/images/bannerSlideImage/SlateStone.png";
import PO_banner from "../../public/images/bannerSlideImage/PO_banner.jpg";
import colorBoom from "../../public/images/bannerSlideImage/Color_boom.png";
import Banner_1 from "../../public/images/bannerSlideImage/Banner_1.png";

function TopSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider className="topSlider_up" {...settings}>
      <div className="toppslider_container">
        <div className="toppslider_container_text">
          <span className="color-boom">
            Color <span>Boom</span>
          </span>
          <span className="bywilmax">by Wilmax</span>
          <button className="view-now">VIEW NOW</button>
        </div>
        <div className="toppslider_container_img">
          <Image
            src={colorBoom}
            alt="img"
            layout="intrinsic"
            loading="lazy"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="toppslider_container slatestone">
        <div className="toppslider_container_text">
          <span className="slatestone-collection">
            Slatestone <span>Collection</span>
          </span>
          <span className="bywilmax">by Wilmax</span>
          <button className="view-now">VIEW NOW</button>
        </div>
        <div className="toppslider_container_img">
          <Image
            src={slateStone}
            alt="img"
            layout="intrinsic"
            loading="lazy"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="toppslider_container sandstone">
        <div className="toppslider_container_text">
          <span className="sandstone">
            Sandstone <span>Collection</span>
          </span>
          <span className="bywilmax-sandstone">by Wilmax</span>
          <button className="view-now">VIEW NOW</button>
        </div>
        <div className="toppslider_container_img">
          <Image
            src={sandStone}
            alt="img"
            layout="intrinsic"
            loading="lazy"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="toppslider_container pour">
        <div className="toppslider_container_text">
          <span className="pour-over">Pour Over </span>
          <span className="pour-over-text">
            the alternative way of brewing{" "}
          </span>
          <span className="bywilmax">by Wilmax</span>
          <button className="pour-button">VIEW NOW</button>
        </div>
        <div className="toppslider_container_img">
          <Image
            src={PO_banner}
            alt="img"
            layout="intrinsic"
            loading="lazy"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="toppslider_container banner_1">
        <div className="toppslider_container_text">
          <span className="modern-functional">Modern &</span>
          <span className="functional">Functional</span>
          <span className="modernbywilmax">Fine Porcelain by Wilmax</span>
          <button className="view-now">VIEW NOW</button>
        </div>
        <div className="toppslider_container_img">
          <Image
            src={Banner_1}
            alt="img"
            layout="intrinsic"
            loading="lazy"
            objectFit="cover"
          />
        </div>
      </div>
    </Slider>
  );
}

export default TopSlider;

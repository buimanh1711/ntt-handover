import "./style.scss";
import { Row, Col } from "antd";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const bannerSliders = [
  {
    id: 1,
    img: "https://salt.tikicdn.com/cache/w1080/ts/banner/c2/81/f8/244e7a3ed63881032782dfdf09fbcec2.png.webp",
  },
  {
    id: 2,
    img: "https://salt.tikicdn.com/cache/w1080/ts/banner/ca/15/0e/615e3b38ba33625db8a048f033d860da.png.webp",
  },
  {
    id: 3,
    img: "https://salt.tikicdn.com/cache/w1080/ts/banner/c8/e6/2c/58600adba566dba8964aa07d3e72c22a.png.webp",
  },
  {
    id: 4,
    img: "https://salt.tikicdn.com/cache/w1080/ts/banner/ef/f5/61/6ad836d61226f096d2bdc7716299debe.png.webp",
  },
  {
    id: 5,
    img: "https://salt.tikicdn.com/cache/w1080/ts/banner/01/f6/dc/eed29aa98730196f356b674f34262d53.png.webp",
  },
];

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img
        src="https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png"
        alt="next-arrow"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img
        src="https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png"
        alt="next-arrow"
      />
    </div>
  );
}

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="banner_home">
      <div className="banner_home__wrap">
        <Row gutter={[{ xl: 8, lg: 8, md: 8, sm: 8, xs: 8 }, 0]}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Link to="#" className="banner_home__sliders">
              <Slider {...settings}>
                {bannerSliders.map((bannerSliderItem) => {
                  return (
                    <div
                      className="banner_home__slider"
                      key={bannerSliderItem.id}
                    >
                      <img src={bannerSliderItem.img} alt="banner" />
                    </div>
                  );
                })}
              </Slider>
            </Link>
          </Col>
          <Col xl={8} lg={0} md={0} sm={0} xs={0}>
            <div className="banner_home__single">
              <img
                src="https://salt.tikicdn.com/cache/w400/ts/banner/ba/22/fa/dd2dbc29a30383ecb78ee4fe22000346.png.webp"
                alt="banner"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;

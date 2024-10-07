import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { informationOurInstructor } from "~/data/About/informationOurInstructor";
import styles from "./OurInstructorSlider.module.scss";
const cx = classNames.bind(styles);

function OurInstructorSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={4}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      loop={true}
      speed={1000}
    >
      {informationOurInstructor.map((item) => (
        <SwiperSlide key={item.id}>
          <div className={cx("info-slider")}>
            <div className={cx("info-slider-item")}>
              <div className={cx("item-img")}>
                <img src={item.image} />
              </div>
              <div className={cx("item-name")}>{item.name}</div>
              <div className={cx("item-job")}>{item.job}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default OurInstructorSlider;

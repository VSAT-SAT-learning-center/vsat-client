import classNames from "classnames/bind";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { informationSlider } from "../../../../data/Home/informationSlider.js";
import styles from "./IntroductionSlider.module.scss";
const cx = classNames.bind(styles);
function IntroductionSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      loop={true}
      speed={800}
    >
      {informationSlider.map((item) => (
        <SwiperSlide key={item.id}>
          <div className={cx('slider-item')}>
            <div className={cx('item-icon')} style={{ backgroundColor: item.color }}>
              <img src={item.icon} alt="icon_manager" className={cx('icon')} />
            </div>
            <div className={cx('item-title')}>{item.title}</div>
            <div className={cx('item-desc')}>{item.desc}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default IntroductionSlider;

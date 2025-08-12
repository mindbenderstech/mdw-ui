'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Link from 'next/link';
import { toCdnUrl } from '../../utils/cdn';

interface Article {
  id: number;
  title: string;
  image_path: string;
  unique_id_url: string;
  article_date: string;
}

interface Props {
  articles: Article[];
  language: string;
  slidesPerViewMobile?: number;
}

const SwipeCarousel: React.FC<Props> = ({ articles, language, slidesPerViewMobile = 2 }) => {
  return (
    <Swiper
      breakpoints={{
        0: {
          slidesPerView: slidesPerViewMobile,
          spaceBetween: 10,
        },
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="w-full"
    >
      {articles.map((article) => (
        <SwiperSlide key={article.id}>
          <Link href={`/news/${language}/${article.unique_id_url}`}>
            <div className="p-2">
              <img
                src={toCdnUrl(article.image_path) || article.image_path}
                alt={article.title}
                loading="lazy"
                decoding="async"
                width={400}
                height={225}
                className="w-full h-auto object-cover rounded"
              />
              <h3 className="text-md font-semibold text-gray-800 mt-2 hover:text-indigo-600">{article.title}</h3>
              <p className="text-xs text-gray-500">{article.article_date}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwipeCarousel;

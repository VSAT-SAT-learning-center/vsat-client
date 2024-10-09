import classNames from "classnames/bind";
import styles from "./BlogList.module.scss";
import { informationNews } from "~/data/News/BlogAndNews/informationNews"; 
const cx = classNames.bind(styles);

function BlogList() {
  return (
    <div className={cx("blog-list-container")}>
      <div className={cx("blog-list-title")}>Lots of new Blogs & News</div>
      <div className={cx("blog-list")}>
        {informationNews.map((blog) => (
          <div className={cx("blog-card")} key={blog.id}>
            <a href={blog.link} target="_blank" rel="noopener noreferrer">
              <img
                src={blog.image}
                alt={blog.name}
                className={cx("blog-image")}
              />
              <div className={cx("blog-details")}>
                <span className={cx("blog-category")}>EDUCATION . NEWS</span>
                <div className={cx("blog-title")}>{blog.name}</div>
                <div className={cx("blog-meta")}>
                  <span className={cx("blog-date")}>Date: June 15, 2021</span> {}
                  <span className={cx("blog-author")}>By Guest Admin</span> {}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

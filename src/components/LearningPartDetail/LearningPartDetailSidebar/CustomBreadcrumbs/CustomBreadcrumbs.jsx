import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import styles from "./CustomBreadcrumbs.module.scss";
const cx = classNames.bind(styles);

function CustomBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatBreadcrumbName = (value) => {
    if (value.includes(":")) {
      const [unitNumber] = value.split(":");
      return `Unit ${unitNumber}`;
    }
    if (value === "sat-reading-and-writing")
      return "Digital SAT Reading and Writing";
    if (value === "sat-math") return "Digital SAT Math";
    return value.replace(/-/g, " ").charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className={cx("breadcrumb")}>
        {pathnames
          // Filter out 'learning' and the final numeric path (if it exists)
          .filter(
            (value, index, arr) =>
              value !== "learning" && (index !== arr.length - 1 || isNaN(value))
          )
          .map((value, index) => {
            // Base path without 'learning'
            const filteredPathnames = pathnames.filter((v) => v !== "learning");
            const basePath = filteredPathnames.slice(0, index + 1).join("/");

            // Prepend '/learning/' to all breadcrumb links
            const to = `/learning/${basePath}`;

            return (
              <li key={to} className={cx("breadcrumb-item")}>
                <Link to={to} className={cx("breadcrumb-link")}>
                  {formatBreadcrumbName(value)}
                </Link>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}

export default CustomBreadcrumbs;

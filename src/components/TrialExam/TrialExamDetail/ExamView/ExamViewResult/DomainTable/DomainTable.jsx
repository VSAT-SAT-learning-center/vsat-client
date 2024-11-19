import classNames from "classnames/bind";
import styles from "./DomainTable.module.scss";

const cx = classNames.bind(styles);

function DomainTable({ data }) {
  return (
    <div className={cx("domain-table")}>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Domain Category</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{row.domainContent}</td>
              <td>{row.correctCount}</td>
              <td>{row.incorrectCount}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DomainTable;

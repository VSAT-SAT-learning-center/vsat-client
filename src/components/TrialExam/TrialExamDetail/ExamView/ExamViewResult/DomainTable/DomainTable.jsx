import classNames from "classnames/bind";
import styles from "./DomainTable.module.scss";

const cx = classNames.bind(styles);

function DomainTable() {
  const data = [
    { category: "Craft and Structure", correct: 0, incorrect: 0, total: 14 },
    { category: "Information and Ideas", correct: 0, incorrect: 0, total: 14 },
    { category: "Standard English Convention", correct: 0, incorrect: 0, total: 14 },
    { category: "Expression of Ideas", correct: 0, incorrect: 0, total: 12 },
  ];

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
          {data.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{row.category}</td>
              <td>{row.correct}</td>
              <td>{row.incorrect}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DomainTable;

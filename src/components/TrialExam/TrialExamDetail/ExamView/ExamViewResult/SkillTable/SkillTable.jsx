import classNames from "classnames/bind";
import styles from "./SkillTable.module.scss";

const cx = classNames.bind(styles);

function SkillTable({ data }) {
  return (
    <div className={cx("skill-table")}>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Question Type</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{row.skillContent}</td>
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

export default SkillTable;

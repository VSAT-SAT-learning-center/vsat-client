import classNames from "classnames/bind";
import styles from "./ModuleTable.module.scss";
const cx = classNames.bind(styles);

function ModuleTable() {
  const data = [
    { module: "Module 1", correct: 0, incorrect: 0, total: 27 },
    { module: "Module 2", correct: 0, incorrect: 0, total: 27 },
  ];
  return (
    <div className={cx("rw-table")}>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.module}</td>
              <td>{row.correct}</td>
              <td>{row.incorrect}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ModuleTable

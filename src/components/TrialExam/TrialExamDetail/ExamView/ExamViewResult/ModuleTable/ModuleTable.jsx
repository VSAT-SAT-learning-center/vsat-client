import classNames from "classnames/bind";
import styles from "./ModuleTable.module.scss";
const cx = classNames.bind(styles);

function ModuleTable({ data }) {
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
          {data?.map((row, index) => (
            <tr key={index}>
              <td>{row.moduleTypeName}</td>
              <td>{row.correctCount}</td>
              <td>{row.incorrectCount}</td>
              <td>{row.totalCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ModuleTable

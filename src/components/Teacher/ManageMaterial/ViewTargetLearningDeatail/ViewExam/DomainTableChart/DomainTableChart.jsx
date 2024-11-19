import classNames from "classnames/bind";
import styles from "./DomainTableChart.module.scss";
const cx = classNames.bind(styles);

function DomainTableChart({ data }) {
  return (
    <div className={cx("chart-domain-table")}>
      <div className={cx("chart-table-title")}>Domain Table Distribution</div>
      <div className={cx("domain-table")}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Domain</th>
              <th>Correct</th>
              <th>Incorrect</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                <td style={{ textAlign: "left" }}>{row.domainContent}</td>
                <td>{row.correctCount}</td>
                <td>{row.incorrectCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DomainTableChart

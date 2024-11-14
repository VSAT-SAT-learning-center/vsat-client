import classNames from "classnames/bind";
import styles from "./SkillTable.module.scss";

const cx = classNames.bind(styles);

function SkillTable() {
  const data = [
    { skill: "Word In Context", correct: 0, incorrect: 0, total: 6 },
    { skill: "Text Structure and Purpose", correct: 0, incorrect: 0, total: 6 },
    { skill: "Cross-Text Connection", correct: 0, incorrect: 0, total: 2 },
    { skill: "Central Ideas and Details", correct: 0, incorrect: 0, total: 4 },
    { skill: "Command of Evidence", correct: 0, incorrect: 0, total: 4 },
    { skill: "Command of Evidence (Quantitative)", correct: 0, incorrect: 0, total: 4 },
    { skill: "Inferences", correct: 0, incorrect: 0, total: 2 },
    { skill: "Boundaries", correct: 0, incorrect: 0, total: 4 },
    { skill: "Form, Structure, and Sense", correct: 0, incorrect: 0, total: 8 },
    { skill: "Transitions", correct: 0, incorrect: 0, total: 6 },
    { skill: "Rhetorical Synthesis", correct: 0, incorrect: 0, total: 6 },
  ];

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
          {data.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left" }}>{row.skill}</td>
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

export default SkillTable;

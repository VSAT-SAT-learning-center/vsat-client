import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const generateExcelTemplate = (modulesConfig) => {
  const workbook = XLSX.utils.book_new();
  modulesConfig.forEach((module) => {
    const { name, level, section, domaindistribution } = module;
    const sectionAbbreviation = section === "Reading & Writing" ? "RW" : "Math";
    const sheetName = `${name}${
      level ? " " + level : ""
    } (${sectionAbbreviation})`;
    const sheetData = [
      [
        "Domain",
        "Content",
        "Explain",
        "Level",
        "Section",
        "Skill",
        "isSingleChoiceQuestion",
        "CorrectAnswer",
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4",
      ],
    ];

    domaindistribution.forEach((domain) => {
      const { domain: domainName, numberofquestion } = domain;

      for (let i = 0; i < numberofquestion; i++) {
        sheetData.push([
          domainName, // Domain
          "", // Content
          "", // Explain
          "", // Level
          section, // Section
          "", // Skill
          "", // isSingleChoiceQuestion
          "", // CorrectAnswer
          "", // Answer 1
          "", // Answer 2
          "", // Answer 3
          "", // Answer 4
        ]);
      }
      sheetData.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "ExamTemplate.xlsx");
};

export const generateLessonContentType = (type) => {
  switch (type) {
    case "Definition":
      return "def";
    case "Conceptual":
      return "conc";
    case "Application":
      return "app";
    case "Tips & Tricks":
      return "tips";
    default:
      return "prac";
  }
};
export const renderLessonTypeIcon = (type) => {
  if (type === "Text") {
    return "fa-light fa-file-alt"
  } else if (type === "Math") {
    return "fa-regular fa-function"
  } else if (type === "Quiz") {
    return "fa-light fa-list-check"
  }
}
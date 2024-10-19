import PropTypes from "prop-types"
import MathRenderer from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/MathRenderer"
import PreviewLessonContentMathExample from "../PreviewLessonContentMathExample"

function PreviewLessonContentConc({ content }) {
  return (
    <>
      <MathRenderer loadedContent={content.text} />
      {content.examples.length > 0 && content.examples.map((example, index) => (
        <PreviewLessonContentMathExample key={index} example={example} />
      ))}
    </>
  )
}

PreviewLessonContentConc.propTypes = {
  content: PropTypes.object
}

export default PreviewLessonContentConc

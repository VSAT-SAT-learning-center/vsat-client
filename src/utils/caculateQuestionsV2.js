export const calculateDomainQuestions = (domains, totalQuestions) => {
  return domains.map((item) => {
    const calculatedQuestions = Math.round(
      (item.percentage / 100) * totalQuestions
    );
    const questions = Math.max(
      item.minQuestion,
      Math.min(calculatedQuestions, item.maxQuestion)
    );
    return { ...item, questions };
  });
};

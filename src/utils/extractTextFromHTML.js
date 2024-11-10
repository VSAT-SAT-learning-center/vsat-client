import parse from 'html-react-parser';

export const extractTextFromHTML = (htmlContent) => {
  return parse(htmlContent, {
    replace: (domNode) => {
      if (domNode.type === 'text') {
        return domNode.data; 
      }
    },
  });
};

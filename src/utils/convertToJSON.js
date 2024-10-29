export const convertToJSON = (input) => {
  // const cleanedInput = input.replace(/\\\(/g, "[").replace(/\\\)/g, "]");
  // try {
  //   const jsonObject = JSON.parse(cleanedInput);
  //   return jsonObject;
  // } catch (error) {
  //   console.error("Invalid JSON format:", error);
  //   return null;
  // }
  // const cleanedInput = input.replace(/\\\[/g, "[").replace(/\\\]/g, "]");

  // try {
  //   const jsonObject = JSON.parse(cleanedInput);
  //   return jsonObject;
  // } catch (error) {
  //   console.error("Invalid JSON format:", error);
  //   return null;
  // }
  const cleanedInput = input
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\\\(/g, "[")
    .replace(/\\\)/g, "]");

  try {
    const jsonObject = JSON.parse(cleanedInput);
    return jsonObject;
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return null;
  }
};
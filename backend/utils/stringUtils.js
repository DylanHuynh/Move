const formatDialogue = (name1, dialogues1, name2, dialogues2) => {
  if (dialogues1.length !== dialogues2.length) {
      throw new Error("Dialogue arrays must be of equal length");
  }

  let formattedString = "";
  for (let i = 0; i < dialogues1.length; i++) {
      formattedString += `${name1}: ${dialogues1[i]}\n${name2}: ${dialogues2[i]}\n`;
  }

  return formattedString;
}


module.exports = {formatDialogue};
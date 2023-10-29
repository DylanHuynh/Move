const formatDialogue = (name1, dialogues1, name2, dialogues2) => {
  let formattedString = "";
  for (let i = dialogues1.length - 1; i >= 0 ; i--) {
      formattedString += `${name1}: ${dialogues1[i]}\n${name2}: ${dialogues2[i]}\n`;
  }

  return formattedString;
}


module.exports = {formatDialogue};
let inputs = [];
process.stdin.resume();
process.stdin.setEncoding("utf-8");
let standardInputString = "";
let currentLine = 0;
process.stdin.on("data", (rawData) => {
  standardInputString += rawData;
});

process.stdin.on("end", (rawData) => {
  standardInputString = standardInputString
    .trim()
    .split("\n")
    .map((line) => {
      inputs.push(line);
    });
  inputs.shift();
  patternParse(inputs);
});

function isAlphabet(c) {
  let regex = /[a-z]/;
  return regex.test(c);
}
//patternParse(["a", "b"]);
function patternParse(patterns) {
  let length = patterns[0].length;
  let myMap = new Map();

  patterns.map((pattern) => {
    for (let i = 0; i < pattern.length; i++) {
      let prevMapping = myMap.get(i);
      if (prevMapping) {
        let currentChar = pattern[i];
        if (!prevMapping.conflicted) {
          if (prevMapping.val === "?" && isAlphabet(currentChar)) {
            myMap.set(i, { val: currentChar, conflicted: false });
          } else if (isAlphabet(prevMapping.val) && isAlphabet(currentChar)) {
            if (prevMapping.val !== currentChar)
              myMap.set(i, { val: "?", conflicted: true });
          }
          //skip if prevmap is an alhabet and current is ?, also skip if both are ?
        }
      } else {
        myMap.set(i, { val: pattern[i], conflicted: false });
      }
    }
  });
  let resultString = "";
  for (let i = 0; i < length; i++) {
    let currentChar = myMap.get(i).val;
    let conflicted = myMap.get(i).conflicted;
    if (conflicted) {
      resultString += "?";
      continue;
    }
    if (currentChar === "?") {
      resultString += "a";
    } else {
      resultString += currentChar;
    }
  }
  // console.log(resultString);
  process.stdout.write(resultString);
}

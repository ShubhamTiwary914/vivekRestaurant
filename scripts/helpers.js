
function countSubString(string, subString){
    let countString = 0;
    for(let strIndex=0; strIndex < string.length; strIndex++){
        if(string[strIndex] == subString)
        countString++;
    }
    return countString;
}


///find all the indexes where substring is present
function findSubstringIndexes(string, substring){
    let substringIndexes = [];
    for(let strIndex=0; strIndex< string.length; strIndex++){
        if(string[strIndex] == substring)
            substringIndexes.push(strIndex)
    }
    return substringIndexes
}


function parseIntegersFromString(string, seperator){
    let parsedIntegers = [];
    let splittedString = string.split(seperator)
    splittedString.forEach((unparsedInt)=>{
        parsedIntegers.push(parseInt(unparsedInt))
    })
    return parsedIntegers;
}
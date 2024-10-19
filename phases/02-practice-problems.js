function anagrams(str1, str2) {
  let foundLetters = new Set()
  for(const char of str1){
    foundLetters.add(char)
  }
  for(const char of str2){
    if(!foundLetters.has(char)) return false;
  }
  return true;
}


function commonElements(arr1, arr2) {
  let arr1Elements = new Set([])
  let commonElements = []
  for(const ele of arr1){
    arr1Elements.add(ele)
  }
  for(const ele of arr2){
    if(arr1Elements.has(ele)) commonElements.push(ele);
  }
  return commonElements;
}


function duplicate(arr) {
  const usedChars = new Set()
  let dupe = '';
  for(const ele of arr){
    if(usedChars.has(ele)) dupe = ele
    else usedChars.add(ele)  
  }
  return dupe;
}


function twoSum(nums, target) {
  let nums1 = new Set()
  let missingNum = 0;
  for(const num of nums){
    missingNum = target - num;
    if(nums1.has(missingNum)){
      return true;
    }
    nums1.add(num)
  }
  return false;
}


function wordPatternV1(pattern, strings) {
  const pat = []
  let check = Boolean;
  for(let i = 1; i < pattern.length;i++){
    if(pattern[i] === pattern[i - 1]) pat.push(true)
    else pat.push(false)
  }
  for(let i = 1; i < strings.length; i++){
    check = strings[i] === strings[i - 1]
    if(check !== pat[i-1]) return false
  }
  if(pat.every((ele)=> ele === false)) return false
  return true;
}

function wordPattern(pattern, strings){
  let obj = {};
  let usedNames = new Set()
  for(let i = 0; i < pattern.length; i++){
    let currPat = pattern[i];
    let currString = strings[i];
    if(obj[currPat] === undefined){
      if(usedNames.has(currPat) || usedNames.has(currString)) return false;
      
      obj[pattern[i]] = strings[i]
      usedNames.add(currPat);
      usedNames.add(currString);
      
    } 
    if(obj[pattern[i]] !== strings[i]) return false;
  }
  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
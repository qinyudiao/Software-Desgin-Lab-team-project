cleanName = (name) =>{
    let cleanNameArray = name.split(" ");
    for(let i = 0; i < cleanNameArray.length; i++){
        cleanNameArray[i] = cleanNameArray[i].replace(",", "");
        cleanNameArray[i] = cleanNameArray[i].replace(".", "");
    }
}

parseAstronautName = (name) =>{
    let cleanNameArray = cleanName(name);

    // Take out blank spaces and initials since they mess up formation of full name
    let finalNameArray = []
    for(let i = 0; i < cleanNameArray.length; i++){
        if(cleanNameArray[i] !== '' && cleanNameArray[i].length > 1){
            finalNameArray.push(cleanNameArray[i]);
        }
    }

    let firstName = finalNameArray[1];
    let lastName = finalNameArray[0];
    let fullName  = '';
    if(finalNameArray.length > 2){
        let middleName = finalNameArray[2];
        fullName = firstName + ' ' + middleName + ' ' + lastName; // Might not need middle name
    }
    else{
        fullName = firstName + ' ' + lastName;
    }
    fullName = firstName + ' ' + lastName;
    return fullName;
}

module.exports.parseAstronautName = parseAstronautName;
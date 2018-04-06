//validate if input data had valid structure, so we can sort the data
function isValidInput(inputData, typeOrdenation){
    switch (typeOrdenation){
        case 'data':
            if(inputData.length){
                let structureValid = true;
                inputData.forEach((item, index) => {
                    if(!item.hasOwnProperty('title') || !item.hasOwnProperty('author') || !item.hasOwnProperty('edition')){
                        structureValid = false;
                    }
                });
                if(structureValid){
                    //the sorting data is valid, so just return valid
                    return {valid: true};
                } else {
                    return {valid: false, error: 'Structure of collection not valid. Please provide a valid collection'};
                }
                break;
            } else {
                return {valid: false, error: 'Empty data to sort. Please provide a valid set of books'};
                break;
            }
        case 'args':     
            if(inputData.length){
                let typeValid = true;
                let kindInvalidError;
                inputData.forEach((item, index) => {
                    if(!item.hasOwnProperty('attribute') || !item.hasOwnProperty('order')){
                        typeValid = false;
                        kindInvalidError = 'Structure of ordenation not valid. Please provide a valid structure of ordenation.';
                    }
                    if(item.attribute.toLowerCase() !== 'title' && item.attribute.toLowerCase() !== 'author' && item.attribute.toLowerCase() !== 'edition'){
                        typeValid = false;
                        kindInvalidError = 'Ordenation value not valid. Please provide a valid value of ordenation.';
                    }
                    if(item.order.toLowerCase() !== 'ascending' && item.order.toLowerCase() !== 'descending'){
                        typeValid = false;
                        kindInvalidError = 'Ordenation orientation not valid. Please provide a valid orientation.';
                    }
                });
                if(typeValid){
                    //the sorting data is valid, so just return valid
                    return {valid: true};
                } else {
                    return {valid: false, error: kindInvalidError};
                }
                break;
            } else {
                return {valid: false, error: 'Empty ordenation set. Please provide a valid set of ordenation.'};
                break;
            }
    }
}

//function to create a String with all arguments to sorting data
function compareToSort(itemA, ordenationArgs){
    let sortString = '';
    for(index = 0; index < ordenationArgs.length; index++){
        //sorting using string needs a different approach, using localeCompare
        if(typeof itemA[ordenationArgs[index].attribute.toLowerCase()] ===  'string'){
            if(ordenationArgs[index].order.toLowerCase() === 'ascending'){
                sortString += 'itemA["'+ ordenationArgs[index].attribute.toLowerCase() + '"].localeCompare(itemB["' + ordenationArgs[index].attribute.toLowerCase() +'"]) '
            } else if (ordenationArgs[index].order.toLowerCase() === 'descending'){
                sortString += 'itemB["'+ ordenationArgs[index].attribute.toLowerCase() + '"].localeCompare(itemA["' + ordenationArgs[index].attribute.toLowerCase() + '"]) ';
            }
        } else {
            if(ordenationArgs[index].order.toLowerCase() === 'ascending'){
                sortString += 'parseInt(itemA["' + ordenationArgs[index].attribute.toLowerCase() + '"], 10) - parseInt(itemB["'+ ordenationArgs[index].attribute.toLowerCase()+ '"], 10)';
            } else if (ordenationArgs[index].order.toLowerCase() === 'descending'){
                sortString+= 'parseInt(itemB["'+ ordenationArgs[index].attribute.toLowerCase() + '"], 10) - parseInt(itemA["'+ ordenationArgs[index].attribute.toLowerCase() + '"], 10)';
            }
        }
        if(index !== (ordenationArgs.length - 1)){
            sortString += ' || ';
        }
    };
    return sortString;
}

function sortingService(dataToSort, ordenationArgs) {
    //first validate if Books to ordenate and ordenation params had values and had right structure of objects

    let inputValid = isValidInput(dataToSort, 'data');
    let argsValid = isValidInput(ordenationArgs, 'args');
    
    if(inputValid.valid && argsValid.valid){
        let stringToSortData = compareToSort(dataToSort[0], ordenationArgs);
        console.log(stringToSortData);

        let sortedData = dataToSort.sort((itemA,itemB) => {
            //just eval the string 
            return eval(stringToSortData);
        });
        return {success : 'Data sorted', data: sortedData};
    } else {
        let errorMsg = [];
        if(inputValid.error){
            errorMsg.push(inputValid.error);
        } else if(argsValid.error){
            errorMsg.push(argsValid.error);
        }
        return {"error" : 'SortingServiceException', "message" : errorMsg};
    }
}

module.exports = {
    sortingService: sortingService,
};
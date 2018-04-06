var sortingService = require('./sortingService');
var bookData = require('./books.json');
var ordenation = require('./ordenation');

let sortingResult = sortingService.sortingService(bookData, ordenation);

console.log(sortingResult);

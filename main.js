// // LOGGING OUTPUT
// alert('Hello World'); 
// console.log('Hello World');
// console.error('This is an error');
// console.warn('This is a warning');


// // VARIABLES - var, let, const
// let age = 30;

// // let can be re-assigned, const can not
// age = 31;


// // DATA TYPES - String, Number, Boolean, null, undefined
// const name = 'Ahmed';
// const age = 20;
// const gpa = 3.5;
// const isStudent = true;
// const x = null;
// const y = undefined;
// let z; // undefined

// Check type
// console.log(typeof z);


// // STRINGS

// // Concatenation
// console.log('My name is ' + name + ' and I am ' + age);
// Template literal (better)
// console.log(`My name is ${name} and I am ${age}`);

// // String methods & properties
// const s = 'Hello World';
// let val;
// // // Get length
// val = s.length;
// // // Change case
// val = s.toUpperCase();
// val = s.toLowerCase();
// // // Get sub string
// val = s.substring(0, 5);
// // // Split into array
// val = s.split('');
// // join array into string
// const arr = ['Hello', 'World'];
// val = arr.join(''); // 'Hello World'
// console.log(val);
// // Replace characters
// val = s.replace('l', 'o');
// val = s.replaceAll('l', 'o');
// console.log(val);

// // chain methods
// val = s.toUpperCase().substring(0, 5).split('').join('');
// console.log(val);



// // ARRAYS - Store multiple values in a variable
// const numbers = [1,2,3,4,5];

// console.log(numbers);

// // Get one value - Arrays start at 0
// console.log(numbers[2]);

// // Get length
// console.log(numbers.length);

// // Add value
// numbers[5] = '6';

// console.log(numbers);

// // // Add value using push()
// numbers.push('seven');
// console.log(numbers);

// // // Add to beginning
// numbers.unshift(0);
// console.log(numbers);

// // // Remove last value
// numbers.pop();
// console.log(numbers);

// // // // Check if array
// console.log(Array.isArray(numbers));

// // // // Get index
// console.log(numbers.indexOf(5));

// // // // Reverse array
// console.log(numbers.reverse());

// // // Sort array
// const fruits = ['banana', 'apple', 'orange', 'mango'];
// console.log(fruits.sort());



// // OBJECT LITERALS
// const person = {
//   firstName: 'Ahmed',
//   age: 20,
//   hobbies: ['music', 'gaming', 'coding'],
//   address: {
//     street: '123 Main St',
//     city: 'Boston',
//     state: 'NY'
//   }
// }

// // Get single value
// console.log(person.firstName)

// // Get array value
// console.log(person.hobbies[1]);

// // Get embedded object
// console.log(person.address.city);

// // Add property
// person.email = 'Ahmed@gmail.com';

// // Array of objects
// const todos = [
//   {
//     id: 1,
//     text: 'Study JavaScript',
//     isComplete: false
//   },
//   {
//     id: 2,
//     text: 'Go to the gym',
//     isComplete: false
//   },
//   {
//     id: 3,
//     text: 'Buy groceries',
//     isComplete: true
//   }
// ];

// console.log(todos);

// // Get specific object value
// console.log(todos[1].text);

// // Get specific object property
// console.log(todos[2].isComplete);

// // Format as JSON
// console.log(JSON.stringify(todos));

// // DATES
// const today = new Date();
// console.log(today);
// console.log(typeof today); // Object

// // Format date
// const formattedDate = today.toLocaleDateString('en-US', {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// });

// console.log(formattedDate);
// console.log(today.getFullYear());
// console.log(today.getMonth()); // 0-11
// console.log(today.getDate());

// // LOOPS

// // For
// for(let i = 0; i < 10; i++){
//   console.log(i);
// }

// // // While
// let i = 0
// while(i <= 10) {
//   console.log(i);
//   i++;
// }

// // Loop Through Arrays
// // For Loop
// for(let i = 0; i < todos.length; i++){
//   console.log(` Todo ${i + 1}: ${todos[i].text}`);
// }

// // For...of Loop - Ideal for arrays & strings
// for(let todo of todos) {
//   console.log(todo);
// }

// for(char of 'Hello World') {
//   if (char === ' ') {
//     continue; // Skip spaces
//   }
//   console.log(char);
// }

// // For...in Loop - Used for objects
// for(let todo in todos) {
//   console.log(`Todo ${todo + 1}: ${todos[todo].text}`);
//   console.log(`Is Complete: ${todos[todo].isComplete}`);
//   console.log(`ID: ${todos[todo].id}`);
//   console.log('-------------------');
// }

// // HIGH ORDER ARRAY METHODS (show prototype)

// // forEach() - Loops through array
// todos.forEach(function(todo, i) {
//     console.log(todo);
// });

// // map() - Loop through and create new array
// const todoTexts = todos.map(function(todo) {
//   return todo.text;
// });
// console.log(todoTexts);

// // filter() - Returns array based on condition
// const unfinishedTodos = todos.filter(function(todo) {
//   // Return todos that are not complete
//   return todo.isComplete === false; 
// });
// console.log(unfinishedTodos);


// // CONDITIONALS

// // Simple If/Else Statement
// const x = 30;

// if(x === 10) {
//   console.log('x is 10');
// } else if(x > 10) {
//   console.log('x is greater than 10');
// } else {
//   console.log('x is less than 10')
// }

// // Switch
// const color = 'blue';

// switch(color) {
//   case 'red':
//     console.log('color is red');
//     break; // Break to exit switch
//   case 'blue':
//     console.log('color is blue');
//     break; // Break to exit switch
//   default:  
//     console.log('color is not red or blue');
// }

// // Ternary operator / Shorthand if
// const z = color === 'red' ? 10 : 20;
// console.log(z); // 20



// // FUNCTIONS
// function greet(greeting = 'Hello', name) {
//   if(!name) {
//     // console.log(greeting);
//     return greeting;
//   } else {
//     // console.log(`${greeting} ${name}`);
//     return `${greeting} ${name}`;
//   }
// }
// console.log(greet('Hi', 'Ahmed'));


// // ARROW FUNCTIONS
// const greet = (greeting = 'Hello', name = 'Ahmed') => `${greeting} ${name}`;
// console.log(greet('Hi'));


// // OOP

// // Constructor Function
// function Person(firstName, lastName, dob) {
//   // Set object properties
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.dob = new Date(dob); // Set to actual date object using Date constructor
//   // this.getBirthYear = function(){
//   //   return this.dob.getFullYear();
//   // }
//   // this.getFullName = function() {
//   //   return `${this.firstName} ${this.lastName}`
//   // }
// }

// // Get Birth Year
// Person.prototype.getBirthYear = function () {
//   return this.dob.getFullYear();
// }

// // Get Full Name
// Person.prototype.getFullName = function() {
//   return `${this.firstName} ${this.lastName}`
// }


// // Instantiate an object from the class
// const person1 = new Person('John', 'Doe', '7-8-80');
// const person2 = new Person('Steve', 'Smith', '8-2-90');

// console.log(person2);

// // console.log(person1.getBirthYear());
// // console.log(person1.getFullName());



// // Built in constructors
// const name = new String('Kevin');
// console.log(typeof name); // Shows 'Object'
// const num = new Number(5);
// console.log(typeof num); // Shows 'Object'


// // ES6 CLASSES
// class Person {
//   constructor(firstName, lastName, dob) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.dob = new Date(dob);
//   }

//   // Get Birth Year
//   getBirthYear() {
//     return this.dob.getFullYear();
//   }

//   // Get Full Name
//   getFullName() {
//     return `${this.firstName} ${this.lastName}`
//   }
// }

// const person1 = new Person('Ahmed', 'Mohamed', '7-8-2005');
// console.log(person1);
// console.log(person1.dob);

// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************
// **************************************************************************************************************************************************************************************


//  IS Palindrome
// console.log(isPalindrome('Racecar'));            // true
// console.log(isPalindrome('A man a plan a canal Panama')); // true
// console.log(isPalindrome('hello'));              // false
// console.log(isPalindrome('Was it a car or a cat I saw')); // true
// console.log(isPalindrome('No lemon, no melon')); // true
// console.log(isPalindrome('12321'));              // true
// console.log(isPalindrome('12345'));              // false
// console.log(isPalindrome(''));                   // true (empty string is a palindrome)

// function isPalindrome(str) {

//     cleaned = str.toLowerCase().replaceAll(' ', '');
//     reversed = cleaned.split('').reverse().join('');

//     return cleaned == reversed

// }

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// Is Anagram
// console.log(isAnagram('listen', 'silent'));           // true
// console.log(isAnagram('evil', 'vile'));               // true
// console.log(isAnagram('hello', 'world'));             // false
// console.log(isAnagram('race', 'care'));               // true
// console.log(isAnagram('Dormitory', 'Dirty room'));    // true
// console.log(isAnagram('The eyes', 'They see'));       // true
// console.log(isAnagram('Astronomer', 'Moon starer'));  // true
// console.log(isAnagram('test', 'taste'));              // false
// console.log(isAnagram('aabbcc', 'aabbcc'));           // true
// console.log(isAnagram('aabbc', 'aabbcc'));            // false

// function isAnagram(str1, str2){
//     cleanedstr1 = str1.toLowerCase().replaceAll(' ', '');
//     cleanedstr2 = str2.toLowerCase().replaceAll(' ', '');

//     sortedstr1= cleanedstr1.split('').sort().join('');
//     sortedstr2= cleanedstr2.split('').sort().join('');

//     anagramCheck = sortedstr1 == sortedstr2 ? `${str1} & ${str2} are anagrams` : `${str1} & ${str2} are NOT anagrams`
//     return anagramCheck

// }
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// Longest Words
// // Examples:
// console.log(findLongestWords("I love JavaScript coding")); 


// console.log(findLongestWords("the quick brown dog jumps over lazy dogs"));

// function findLongestWords(str){
//     let arr = str.split(' ');
//     let longestWords = [];
//     let longestLength = 0;
//     console.log(arr)

//     for (let word of arr){
//         if(word.length > longestLength){
//             longestLength = word.length;
//             longestWords = [word];
//         }
//         else if(word.length === longestLength){
//             longestWords.push(word)
//         }
//     }
//     return longestWords
// }
// 
// 
// 
// 
// // Binary Search
// // Example usage:
// const sortedNumbers = [1, 3, 5, 7, 9, 11, 13];

// console.log(binarySearch(sortedNumbers, 13));   
// console.log(binarySearch(sortedNumbers, 2)); 

// function binarySearch(arr, target){
//     leftPointer = 0;
//     rightPointer = arr.length - 1;
    
//     while(leftPointer <= rightPointer){
//         let midPointer = Math.floor((leftPointer + rightPointer) / 2)
//         if(target == arr[midPointer]){
//             return midPointer;
//         }
//         else if(target < arr[midPointer]){
//             rightPointer = midPointer - 1
//         }
//         else {
//             leftPointer = midPointer + 1
//         }
        
//     }

//     return 'Not in array'
// }

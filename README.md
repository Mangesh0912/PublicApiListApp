# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in the interactive watch mode.


### Current Implementation
The React UI Solution implements bufferred rendering using infinite scroll where we display only the records which user can visually see and bring remaining records in the DOM once they reach end of the scroll. Added Github action which runs tests when new code is pushed.

### Further Implementation 
- With this approach on the UI we along with adding dom elements once user starts scrolling down, we can also start removing elements from front of the array for the records which user can't visually see and bring them back in the dom once user scrolls up. This way our UI would be very light weight not many elements in the dom and also Javascript object will be freed up and this approach would scale better for large volumes of data. 



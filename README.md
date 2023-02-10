# Password Validator
  
A microservice that accepts a potential password along with password parameters and responds with the validity of the password.
  
## Description
  
This is a node.js / express server that can be called to validate a potential password for account creation. By making a PUT request to `/validation`, a client can pass a stringified JSON Object to the server containing the potential password, as well as a variety of password requirements. The server will then analyze the password based on these requirements, and return a JSON Object back containing a boolean value to determine if the password was valid, and a message about why the password failed if it was invalid.
  
### The request JSON Object must have the following key-value pairs of the following types:
  
```
request = {
    pw:         STRING,
    reqLength:  INT,
    reqSymbol:  BOOLEAN,
    reqCaps:    BOOLEAN,
    reqNum:     BOOLEAN
}
```
  
Where...  
`pw`        = the password to be validated  
`reqLength` = the number of characters required in the password  
`reqSymbol` = true if a symbol is required in the password, false if not  
`reqCaps`   = true if a capital letter is required in the password, false if not  
`reqNum`    = true if a number is required in the password, false if not  
  
This object should be `stringified` before being sent as a request  
  
### The response JSON Object will have the following key-value pairs of the following types:
  
```
response = {
    isValid: BOOLEAN,
    message: STRING
}
```
  
Where...  
`isValid` = true if the potential password is valid based on the input parameters, false otherwise  
`message` = contains a message about what the potential password is lacking if it is INVALID based on the parameters. Contains an empty string otherwise.  
  
  
NOTE: `message` can be printed directly to the application to warn a user of their mistakes, or can be printed to the console for testing purposes.  

### UML Sequence Diagram for the microservice

![UML Sequence Diagram](PasswordValidator.png?raw=true)

## Getting Started

### Dependencies

* Node.js v16.14.2

### Installing

* [Fork the respository and clone it to your machine](https://docs.github.com/en/get-started/quickstart/fork-a-repo)  
* While in the main directory on your local machine, execute  
```
npm install
```  
* In `app.js`, change the value of `PORT` to the local port you wish to run it on (`PORT = 8080` by deafult).

### Executing program

* To run the program, execute `node app.js` from the main directory
* To make a request to the server hosted locally, open a `POST` request to `127.0.0.1:PORT/validation` with the request header content type of `application/json` (see below code for example usage).

## Help

* When making a POST request to a localhost server, replace "localhost" with "127.0.0.1", as this is the local IP address.

### Example call to the server using an XMLHttpRequest in Javascript
  
The following code example will send the POST request when a submit button is clicked, and print the response values to the screen.
  
```
let form = document.getElementById("send-request");

form.addEventListener("submit", function(e)
{
    e.preventDefault();

    // Setup Request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8080/validation", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Build object
    let password = {
        pw: "password",
        reqLength: 10,
        reqSymbol: true,
        reqCaps: true,
        reqNum: true
    }

    // Tell Request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200)
        {
            console.log("sending request");
            //Recieve data
            showResponse(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200)
        {
            console.log("There was an error");
        }
    }

    // Send the request
    xhttp.send(JSON.stringify(password));
});

showResponse = (data) => {
    let responseP = document.getElementById("response");

    parsedData = JSON.parse(data);

    responseP.innerText = `Valid: ${parsedData.isValid}\nMessage: ${parsedData.message}\n`;
}
```

## Authors

Contributors names and contact info

* [Samantha Jones](https://github.com/kanisxlupus)

## Version History
* 0.1
    * Initial Release

## Acknowledgments

* [DomPizzie README Template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
* [currym-osu Node.js Starter App](https://github.com/osu-cs340-ecampus/nodejs-starter-app)

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

[](PasswordValidator.png)

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
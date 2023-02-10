//app.js (response)

/*SETUP*/
var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());
PORT = 8080;

/*ROUTES*/
app.get('/', function(req, res)
{
    res.send("Password Validation Server running on port " + PORT);
});


/*
    request should be a json object of the following format:

    req {
        pw: string,
        reqLength: int,
        reqSymbol: boolean,
        reqCaps: boolean,
        reqNum: boolean
    }

    where...
        pw -> string containing password to be validated
        reqLength -> int representation of the number of characters required in the password (> 0)
        reqSymbol -> true if a symbol is required
        reqCaps -> true if a capital letter is required
        reqNum -> true if a number is required
        
    
    Will return a json object of the following format:
    res {
        isValid: boolean,
        message: string
    }

    where...
        isValid -> true if password is valid, false otherwise
        message -> empty string if password is valid, contains a message about what invalidated the password otherwise

*/
app.post('/validation', function(req, res)
{
    // Build response object
    let response = {
        isValid: true,
        message: ""
    }

    // Capture in incoming data
    let data = req.body;

    // Check for appropriate fields
    if (!("pw" in data) || !("reqLength" in data) || !("reqSymbol" in data) || !("reqCaps" in data) || !("reqNum" in data))
    {
        console.log("Invalid request object. Expected usage:\n",
                    "req {\n",
                    "   pw: String\n",
                    "   reqLength: int\n",
                    "   reqSymbol: bool\n",
                    "   reqCaps: bool\n",
                    "   reqNum: bool\n",
                    "}");
        res.sendStatus(400);
    }
    else
    {
        // Put data into variable for ease of use
        let pw = data.pw;
        let length = parseInt(data.reqLength);
        let reqSymbol = data.reqSymbol;
        let reqCaps = data.reqCaps; 
        let reqNum = data.reqNum;

        // Check for proper length
        if(pw.length < length)
        {
            response.isValid = false;
            response.message += `Password must be at least ${length} characters long.\n`
        }

        // Check possible requirements
        let hasSymbol = false;
        let hasCaps = false;
        let hasNum = false;

        for (let i = 0; i < pw.length; i++)
        {
            let charCode = pw.charCodeAt(i);
            
            // Check for Symbols !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
            if ((charCode > 32 && charCode < 48) || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 127))
            {
                hasSymbol = true;
            }

            // Check for capital letters
            if (charCode > 64 && charCode < 91)
            {
                hasCaps = true;
            }

            // Check for numbers
            if (charCode > 47 && charCode < 58)
            {
                hasNum = true;
            }
        }

        // Compare contents to requirements
        if (reqSymbol && !hasSymbol)
        {
            response.isValid = false;
            response.message += "Password must include a symbol.\n";
        }

        if (reqCaps && !hasCaps)
        {
            response.isValid = false;
            response.message += "Password must include a capital letter.\n";
        }

        if (reqNum && !hasNum)
        {
            response.isValid = false;
            response.message += "Password must include a number.\n";
        }

        res.send(response);
    }
    
});

/*LISTENER*/
app.listen(PORT, function()
{
    console.log('Express started on http://localhost:' + PORT);
});
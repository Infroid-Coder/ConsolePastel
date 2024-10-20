// function to check the type of a value
function typeOf(val){ // define the function 'typeOf'
    return Object.getPrototypeOf(val).constructor.name.toLowerCase(); // get and return the constructor name of the value as the type
}


function TPastel(){ // define the constructor function 'TPastel'
    let colourCodes = { // define the 'colourCodes' object to store the colour codes for the escape sequence
        default: '0',
        black: '30',
        red: '31',
        green: '32',
        yellow: '33',
        blue: '34',
        magenta: '35',
        cyan: '36',
        white: '37'
    }
    let styleCodes = { // define the 'colourCodes' object to store the style codes for the escape sequence
        default: '0',
        bold: '1',
        italic: '3',
        underline: '4',
        strikethrough: '9'
    }
    let allowedStyles = Object.keys(styleCodes); // get the keynames of each value in 'styleCodes' as a list of allowed styles
    let allowedColours = Object.keys(colourCodes); // get the keynames of each value in 'styleCodes' as a list of allowed colours

    this.format = ( // defines the method 'format' : formats a string in to the styles requested and return it
        val='', // method argument; takes a string as the value which will be logged to the console after the colours are added
        styles={ // method argument; takes an object as the value which contains the info on which styles to be added to the string.
            color: "default", // specifies the colour to which the string should be changed to.  ex: {color: 'yellow' ...}
            style: "default" // specifies the colour to which the string should be changed to.   ex: {...style: 'bold'}
        },
        endWithReset=true // method argument; takes a boolean value to specify whether or not the colour should be reset at the end of the string
    ) => {
        styles.color = (styles.color) ? styles.color : 'default'; // sets the 'color' property of the 'styles' object to 'default' if it is not set
        styles.style = (styles.style) ? styles.style : 'default'; // sets the 'style' property of the 'styles' object to 'default' if it is not set
        if(
            typeOf(val) === "string" && // checks whether the value of the argument 'val' is a string'
            typeOf(styles) === "object" && // checks whether the value of the argument 'styles' is an object
            val.length > 0 && // checks if the length of the string 'val' is greater than 0
            allowedColours.includes(`${styles.color}`.toLowerCase()) && // checks if the colour passed into the 'styles' object is allowed
            allowedStyles.includes(`${styles.style}`.toLowerCase()) // checks if the style passed into the 'styles' object is allowed
        ){  
            if(styles.style === "default" && styles.color === "default"){ // if the requested colour and style are both set to default...
                return val; // return the original string
            } else if(styles.style === "default"){ // if only the requested style is set to default...
                return `\x1b[${colourCodes[styles.color]}m${val}${(endWithReset) ? '\x1b[0m' : ''}`; // format the string using an escape sequence, inserts the reset code if 'endWithReset' is set to true and return it
            } else if(styles.color === "default"){ // if only the requested colour is set to default...
                return `\x1b[${styleCodes[styles.style]}m${val}${(endWithReset) ? '\x1b[0m' : ''}`; // format the string using an escape sequence, inserts the reset code if 'endWithReset' is set to true and return it
            } else{ // if neither is set to default...
                return `\x1b[${styleCodes[styles.style]};${colourCodes[styles.color]}m${val}${(endWithReset) ? '\x1b[0m' : ''}`; // format the string using an escape sequence, inserts the reset code if 'endWithReset' is set to true and return it
            }
            
        } else{ // if the requirements aren't met...
            return val; // return the original string
        }
    }
    this.log = ( // define the method 'log': formats a string in to the styles requested and logs to the console
        val='', // method argument; takes a string as the value which will be logged to the console after the colours are added
        styles={ // method argument; takes an object as the value which contains the info on which styles to be added to the string.
            color: "default", // specifies the colour to which the string should be changed to.  ex: {color: 'yellow' ...}
            style: "default" // specifies the colour to which the string should be changed to.   ex: {...style: 'bold'}
        }) => {
        console.log(this.format(val, styles, true)); // format the string using the format function and log to the console
    }
    this.f = ( // defines the method 'f': formats specific parts of the string and returns the value
        str = "" // method argument; takes a string to be formatted
    ) => {
        if(!typeOf(str) === "string") return str;
        let reg = /<[^:]+:[0-4][0-8]>/g; // regular expression to identify the 'stylable blocks' of the string
        /* 
            example stylable block: '<string content:16>' 
            here, 'string content' is the content to be formatted and '16' specifies the styles to be added. The SB (Stylable Block) Codes are listed below.
            style - 0: default
                  - 1: bold
                  - 2: italic
                  - 3: underline
                  - 4: strikethrough

            color - 0: default
                  - 1: black
                  - 2: red
                  - 3: green
                  - 4: yellow
                  - 5: blue
                  - 6: magenta
                  - 7: cyan
                  - 8: white
            
            So, the what the example block says is to make the text bold and change the colour to magenta.
            Check the documentation for more info: https://github.com/Infroid-Coder/TerminalTPastel#Documentation 
        */
        let cases = str.match(reg); // get all the stylable blocks within the string
        if(!cases) return str; // if no stylable blocks are present within the string, return the original string
        let nstr = str; // define a new variable named 'nstr' with the 'str' argument as the value
        cases.forEach(val => { // for each stylable block...
            let valS = val.replace(/#SEM#/g,':').slice(1, -4); // get the string value excluding the style settings by slicing
            let style = Number(val.slice(-3,-2)); // get the style number from the style setting by slicing
            let colour = Number(val.slice(-2,-1)); // get the colour number from the style setting by slicing
            nstr = nstr.replace( // set the value of 'nstr' to the value of 'nstr' after replacing...
                RegExp(val,"g"), // all the instances where the current case appears with...
                this.format(valS, {color: allowedColours[colour], style: allowedStyles[style]}) // the value after formatting the case string with the relevant settings
            );
        });
        return nstr; // return the formatted string
    }
}

module.exports = new TPastel(); // export a new instance of the TPastel constructor as the module export value
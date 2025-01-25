<center>

# ConsolePastel

ConsolePastel is a javascript tool which allows you to log text to the console in different colours and styles with the help of escape sequences.

</center>

<hr>

# Documentation 

## Table of Contents

- [Installation - Node JS](#installation---node-js)
- [Implementation - Web](#implementation---web)
- [Functions](#functions)
- [Colours](#colours)
- [Styles](#styles)

## Installation - Node JS

Navigate to your project folder in the cmd and run the following command.

```
npm i console-pastel
```


## Implementation - Web

## Functions

- #### format

```
cpastel.format('Hello World', {color: 'red', style: 'bold'}, true);
```

In this example, we are calling the `cpastel.format` function to format a string into a certain colour and/or style. The arguments passed into the function must take the following form.

**argument1**
\- string to be formatted using Terminal Pastel
**argument 2**
\- an object containing 2 properties; 'color' and 'style' to specify what colour and style the text should be formatted to. Check out the [Colours](#colours) and [Styles](#styles) for more info.
**argument 3**
\- specifies whether the styles should be reset at the end of the string. If set to false, the styles will be carried to the next content logged to the console.

- #### log

```
cpastel.log('Hello World', {color: 'yellow', style: 'bold'});
```
In this example, we are calling the `cpastel.log` function to format a string into a certain colour and/or style and log it to the console. The arguments passed into the function must take the following form.

**argument1**
\- string to be formatted and logged to the console
**argument2**
\- an object containing 2 properties; 'color' and 'style' to specify what colour and style the text should be formatted to. Check out the [Colours](#colours) and [Styles](#styles) for more info.

- #### f
```
cpastel.f('<Lorem ipsum:12> dolor, sit amet <consectetur:34>');
```

In this example, we call the `pastel.f` function. Instead of formatting the entire string, it formats parts of the string we specify using **stylable blocks**. 

Stylable blocks are written in the following way.

```
<Text to be formatted:[style code][colour code]>
```
To get the colour/style codes, check out the [Colours](#colours) and [Styles](#styles) sections. Some example stylable blocks are given below.

```
<Lorem ipsum:11> // same as, {color: 'black', style: 'bold'};
<Lorem ipsum:34> // same as, {color: 'yellow', style: 'underline'};
<Lorem ipsum:36> // same as, {color: 'magenta', style: 'underline'};
<Lorem ipsum:42> // same as, {color: 'red', style: 'strikethrough'};
```



## Colours

|    Colour    |   Value   | Code |
| ------------ | --------- | ---- |
|    Default   |  default  |   0  |
|    Black     |  black    |   1  |
|    Red       |  red      |   2  |
|    Green     |  green    |   3  |
|    Yellow    |  yellow   |   4  |
|    Blue      |  blue     |   5  |
|    Magenta   |  magenta  |   6  |
|    Cyan      |  cyan     |   7  |
|    White     |  white    |   8  |

## Styles

|    Style         |   Value        | Code |
| ------------     | ---------      | ---- |
|    Default       |  default       |   0  |
|    Bold          |  bold          |   1  |
|    Italic        |  italic        |   2  |
|    Underline     |  underline     |   3  |
|    Strikethrough |  strikethrough |   4  |

<hr>


<center>

# ----- End -----

</center>

# arrays-to-csv
NPM Module to write CSV files o string from Array 

You can use this library in your projects to generate csv files from a simple javascript array of objects. This library give us the solution to export csv with diferents delimiters like ',' or ';' without problems. 

# Install

Using npm in Node.js project
> npm install arrays-to-csv

# Setup

Once the module is installed in your project, you must import it to be able to use it.

```javascript
const arrayToCsv = require('arrays-to-csv');

data = [
    {
        field1: 'value1Row1',
        field2: 'value2Row1'
    },
    {
        field1: 'value1Row2',
        field2: 'value2Row2'
    }
]

var csvGenerator = new arrayToCsv(data, { delimiter: ',' });
```

# get the csv String to manage the content in downloads, uploads...

To get the csv string, execute the method.

```javascript
const arrayToCsv = require('arrays-to-csv');

data = [
    {
        field1: 'value1Row1',
        field2: 'value2Row1'
    },
    {
        field1: 'value1Row2',
        field2: 'value2Row2'
    }
]

//Create the generator
var csvGenerator = new arrayToCsv(data, { delimiter: ',' });

//Execute the method
var csv = csVGenerator.getCsv();

```

# Download csv file to localhost

To download the csv file, indicate the path and execute the saveFile() method.

```javascript
const arrayToCsv = require('arrays-to-csv');

data = [
    {
        field1: 'value1Row1',
        field2: 'value2Row1'
    },
    {
        field1: 'value1Row2',
        field2: 'value2Row2'
    }
]

//Create the generator
var csvGenerator = new arrayToCsv(data, { delimiter: ',' });

//Execute the method
csVGenerator.saveFile('./data.csv');

```
# Params new arrayToCsv(data, params = {})

Param  | Default value
------------- | -------------
delimiter  | ,
quote  | "

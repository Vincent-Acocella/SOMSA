var PythonShell = require('python-shell');

var options = {
    mode: 'text',
    pythonPath: 'path/to/python',
    pythonOptions: ['-u'],
    scriptPath: '../src/',
    args: ['topic', 'catagory']
};

PythonShell.run('test.py', options, function (err, results) {
    if (err) throw err; 
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
});

//OR

// https://ourcodeworld.com/articles/read/286/how-to-execute-a-python-script-and-retrieve-output-data-and-errors-in-node-js
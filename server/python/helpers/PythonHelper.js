// Easiest way I know of is to use "child_process" package which comes packaged with node.

// Then you can do something like:

// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["path/to/script.py", arg1, arg2, ...]);
// Then all you have to do is make sure that you import sys in your python script, and then you can access arg1 using sys.argv[1], arg2 using sys.argv[2], and so on.

// To send data back to node just do the following in the python script:

// print(dataToSendBack)
// sys.stdout.flush()
// And then node can listen for data using:

// pythonProcess.stdout.on('data', (data) => {
//     // Do something with the data returned from python script
// });

//OR

// const express = require('express')
// const app = express()

// let runPy = new Promise(function(success, nosuccess) {

//     const { spawn } = require('child_process');
//     const pyprog = spawn('python', ['./../pypy.py']);

//     pyprog.stdout.on('data', function(data) {

//         success(data);
//     });

//     pyprog.stderr.on('data', (data) => {

//         nosuccess(data);
//     });
// });

// app.get('/', (req, res) => {

//     res.write('welcome\n');

//     runPy.then(function(fromRunpy) {
//         console.log(fromRunpy.toString());
//         res.end(fromRunpy);
//     });
// })

// app.listen(4000, () => console.log('Application listening on port 4000!'))

//OR

// var PythonShell = require('python-shell');

// var options = {
//     mode: 'text',
//     pythonPath: 'path/to/python',
//     pythonOptions: ['-u'],
//     scriptPath: 'path/to/my/scripts',
//     args: ['value1', 'value2', 'value3']
// };

// PythonShell.run('script.py', options, function (err, results) {
//     if (err) throw err;
//     // results is an array consisting of messages collected during execution
//     console.log('results: %j', results);
// });

//OR

// https://ourcodeworld.com/articles/read/286/how-to-execute-a-python-script-and-retrieve-output-data-and-errors-in-node-js
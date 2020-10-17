var axios = require('axios');
var fs = require('fs');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
//node app.js url bearear-key data 
//node app.js http://xxxxxxxxxxxx:3333/devices/2 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTYwMjI2NjE5MX0.QWWkugNhS_QF6Sc-ARtx3CFnweM8H7CbGCjkXgM28dw' '{\"email\":\"user@gmail.com\",\"password\":\"28c8edde3d61a0411511d3b1866f0636\"}' usermon

var data = myArgs[2];

var config = {
  method: 'get',
  url:myArgs[0],
  headers: { 
    'Authorization': 'Bearer '+myArgs[1], 
    'Content-Type': 'application/json'
  },
  data : data
};
var filename = 'temp-'+myArgs[3]+'.txt';
 
axios(config)
.then(function (response) {
     var content = JSON.stringify(response.data);
    if(!fs.existsSync(filename)){
        console.log('new file created '+filename);
        fs.writeFile(filename, content, (err)=>{});
    }
    else{
        var filecontent = fs.readFileSync(filename);
        if(filecontent != content )
        {
            console.log('changes '+filename);
            fs.writeFile(filename, content, (err)=>{});
        }
        else
            console.log('result is the same');
    }
   
    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
    if(!fs.existsSync(filename)){
        console.log('new file created with error '+filename);
        fs.writeFile(filename, error, (err)=>{});
    }
    else{
        var filecontent = fs.readFileSync(filename);
   
        if(filecontent != error){
            
            console.log('error ');
            fs.writeFile(filename, error, (err)=>{});
        }
    }
       
});

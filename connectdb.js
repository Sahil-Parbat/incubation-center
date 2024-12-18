const mysql=require('mysql');

const connection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'system@123',
        port:3306,
        database:'incubation_center'
        
        
    }
);

connection.connect((err)=>{
    if(err){console.log(err)
       
    }
    else{console.log('connected...')}
});


module.exports=(connection);
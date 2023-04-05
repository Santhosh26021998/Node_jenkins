const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mycon = require('mysql');
const fileupload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(fileupload());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

let c = mycon.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "Kiruthi@2505",
    database : "radical"
});

c.connect(function(error){
    if(error){console.log(error);}
    else{console.log('Database Connected');}
});

app.post('/Create_table',(request,response)=>{

    let sql = 'create table students(id bigint not null primary key auto_increment,firstname varchar(300),lastname varchar(300),email varchar(300),dob varchar(300),education varchar(300),location varchar(300),about varchar(300),status varchar(300))';

    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})

app.post('/Insert_table',(request,response)=>{

    let {firstname,lastname,email,dob,education,location,about} = request.body;

    let sql = 'insert into students(firstname,lastname,email,dob,education,location,about,status) values (?,?,?,?,?,?,?,?)';

    c.query(sql,[firstname,lastname,email,dob,education,location,about,0],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

app.get('/Select_table',(request,response)=>{

    let sql = 'select * from students';

    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})

app.get('/Select_table_par/:id',(request,response)=>{

    let {id} = request.params;

    let sql = 'select * from students where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})


app.put('/Select_table_update/:id',(request,response)=>{

    let {id} = request.params;
    let {email,location} = request.body;

    let sql = 'update students set email=?,location=? where id=?';

    c.query(sql,[email,location,id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})

app.delete('/Select_table_delete/:id',(request,response)=>{

    let {id} = request.params;

    let sql = 'delete from students where id = ?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})


app.listen(3000, ()=> {console.log('Server is running on port 1000')});
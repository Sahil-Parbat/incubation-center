

const express =require('express');
const PDFDocument = require('pdfkit');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection=require('./connectdb');


const app=express();

const port=3000;

app.use(express.static('public'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
})

app.get("/faculty-dashboard",(req,res)=>{
    res.render("faculty-dashboard");
})

app.get("/application",(req,res)=>{
    res.render("application");
})

app.get("/faculty-application",(req,res)=>{
    res.render("faculty-application");
})

app.get("/faculty-tables",(req,res)=>{
    const applicationId = 6;
    const sql = 'SELECT * FROM Applications';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching application data:', err);
            return res.status(500).send('Error fetching application data');
        }
        
        // If application not found, return 404 error
        if (results.length === 0) {
           res.send("Data not found");
        }
        

        // res.send(results);
        // Render view_application.ejs with application details
        res.render('faculty-tables', { applications: results });
    });
})

app.post("/application",(req,res)=>{
    const managerId = 1; // Assuming you store the manager ID in the session
    const facultyId = 1; // Assuming you retrieve the faculty ID from the form or any other source
    const title = req.body.title;
    const description = req.body.description;
    const attachment = req.body.attachment;

    // Insert the application data into the database
    const sql = 'INSERT INTO Applications (manager_id, faculty_id, title, description, attachment) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [managerId, facultyId, title, description, attachment], (err, result) => {
        if (err) {
            console.error('Error inserting application data: ' + err.message);
            return res.status(500).send('Error inserting application data');
        }
        console.log('Application data inserted successfully');
        res.redirect('/tables');
    });
})

app.get("/newmanagerlogin",(req,res)=>{
    res.render("newmanagerlogin");
})

app.post("/newmanagerlogin",(req,res)=>{
    console.log(req.body);

    const username=req.body.username;
    const password=req.body.password;

    const data={username,password};

    console.log("done login");
    console.log('logedin')
   

    
    
  
    connection.query("select username,password from Managers where username=?;",username, (er, result) => {

        if(er)
        {
            console.error('Error fetching application data:', err);
            return res.status(500).send('Error fetching application data');
        }
        else
        {
            console.log(result)
            console.log(result[0].username);
             console.log(result[0].password);
            if((result[0].username == req.body.username))
            {

                if((result[0].password == req.body.password)){

                    console.log('Dipak Success')
                    res.render("dashboard");
                 
                }
                
            }

        }
       
    });
})


app.get("/newfacultylogin",(req,res)=>{
    res.render("newfacultylogin");
})

app.post("/newfacultylogin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const data={username,password};

    console.log("done login");
    console.log('logedin')
   

    
    
  
    connection.query("select username,password from Faculty where username=?;",username, (er, result) => {

        if(er)
        {
            
            console.error('Error fetching application data:', err);
            return res.status(500).send('Error fetching application data');
        }
        else
        {
            console.log(result)
            console.log(result[0].username);
             console.log(result[0].password);
            if((result[0].username == req.body.username))
            {

                if((result[0].password == req.body.password)){

                    console.log('Dipak Success')
                    res.render("faculty-dashboard");
                 
                }
                
            }

        }
       
    });


    
})


app.get("/tables",(req,res)=>{
    const applicationId = 6;
    const sql = 'SELECT * FROM Applications';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching application data:', err);
            return res.status(500).send('Error fetching application data');
        }
        
        // If application not found, return 404 error
        if (results.length === 0) {
           res.send("Data not found");
        }
        

        // res.send(results);
        // Render view_application.ejs with application details
        res.render('tables', { applications: results });
    });
})


app.get("/managerlog",(req,res)=>{
    res.render("managerlog");
})

app.get("/facultylog",(req,res)=>{
    res.render("facultylog")
})


app.post("/managerlog",(req,res)=>{

    console.log(req.body);

    const username=req.body.username;
    const password=req.body.password;

    const data={username,password};

    console.log("done login");
    console.log('logedin')
   

    
    
  
    connection.query("select username,password from Managers where username=?;",username, (er, result) => {

        if(er)
        {
            res.render("managerlog");
            console.log('er');
            return;

        }
        else
        {
            console.log(result)
            console.log(result[0].username);
             console.log(result[0].password);
            if((result[0].username == req.body.username))
            {

                if((result[0].password == req.body.password)){

                    console.log('Dipak Success')
                    res.render("ManagerPanel");
                 
                }
                
            }

        }
       
    });

    

    

})



app.get("/manager/new-application",(req,res)=>{
    res.render("new-application");
})


app.post("/manager/new-application/submit-application", (req, res) => {
    const managerId = 1; // Assuming you store the manager ID in the session
    const facultyId = 1; // Assuming you retrieve the faculty ID from the form or any other source
    const title = req.body.title;
    const description = req.body.description;
    const attachment = req.body.attachment;

    // Insert the application data into the database
    const sql = 'INSERT INTO Applications (manager_id, faculty_id, title, description, attachment) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [managerId, facultyId, title, description, attachment], (err, result) => {
        if (err) {
            console.error('Error inserting application data: ' + err.message);
            return res.status(500).send('Error inserting application data');
        }
        console.log('Application data inserted successfully');
        res.redirect('/manager/view-applications');
    });
});


app.get("/manager/view-applications",(req,res)=>{
    const applicationId = 6;
    const sql = 'SELECT * FROM Applications';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching application data:', err);
            return res.status(500).send('Error fetching application data');
        }
        
        // If application not found, return 404 error
        if (results.length === 0) {
            return res.status(404).send('Application not found');
        }
        

        // res.send(results);
        // Render view_application.ejs with application details
        res.render('view-applications', { applications: results });
    });
})



app.get("/faculty/view-applications-faculty",(req,res)=>{
   
    const sql = 'SELECT * FROM Applications';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching application data:', err);
            return res.status(500).send('Error fetching application data');
        }
        
        // If application not found, return 404 error
        if (results.length === 0) {
            return res.status(404).send('Application not found');
        }
        

        // res.send(results);
        // Render view_application.ejs with application details
        res.render('view-applications-faculty', { applications: results });
    });
})


app.post("/facultylog",(req,res)=>{

    console.log(req.body);

    const username=req.body.username;
    const password=req.body.password;

    const data={username,password};

    console.log("done login");
    console.log('logedin')
   

    
    
  
    connection.query("select username,password from Faculty where username=?;",username, (er, result) => {

        if(er)
        {
            // res.render("managerlog");
            console.log('er');

        }
        else
        {
            console.log(result)
            console.log(result[0].username);
             console.log(result[0].password);
            if((result[0].username == req.body.username))
            {

                if((result[0].password == req.body.password)){

                    console.log('Dipak Success')
                    res.render("FacultyPanel");
                 
                }
                
            }

        }
       
    });

    

    

})


app.post("/faculty/action",(req,res)=>{
    const application_id=req.body.application_id;
    const application_status = req.body.application_status; 
  

    const sql = 'UPDATE Applications SET status = ? WHERE application_id = ?';

    // Execute the query
    connection.query(sql, [application_status, application_id], (err, result) => {
        if (err) {
            console.error('Error updating application status:', err);
            // Handle error appropriately
        } else {
           res.send('Application status updated successfully');
            
        }
    });
})


app.post("/view",(req,res)=>{

    const application_id=req.body.application_id;
    
    

    const sql="SELECT * from Applications WHERE application_id = ?";
    connection.query(sql, [application_id], (err, result) => {
        if (err) {
            console.error('Error viewing application:', err);
            res.status(500).send('Error viewing application');
        } else {
            
            const application = result[0]; 
            res.render('letter', { application });
        }
    });
    
})

app.listen(port,()=>{
    console.log(`server started ${port} http://localhost:3000/`);
})



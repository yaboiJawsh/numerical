// SABLAN, JOSHUA ANDREI D.
// CS-401
const express = require('express'); 
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send(`
    <form action="/MembershipManagement" method="post">
    <b>XYZ Membership Management System</b><br>
    Member ID          <input type="text" name="id"><br>
    Full Name          <input type="text" name="name"><br>
    <button type="submit">Submit</button>
    </form>
    `);
});

app.post('/MembershipManagement', (req, res) => {
    const num1 = parseFloat(req.body.num1); 
    const num2 = parseFloat(req.body.num2); 
    const num3 = parseFloat(req.body.num3);
    const enrollmentfee = num1*num2;
    const miscfee = enrollmentfee * 0.10; 
    const tuitionfee = enrollmentfee + miscfee + num3;
    res.send(`Your enrollment fee is ₱${enrollmentfee.toFixed(2)}<br>
    Your miscellaneous fee is ₱${miscfee.toFixed(2)}<br>
    Your tuition fee is ₱${tuitionfee.toFixed(2)}`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
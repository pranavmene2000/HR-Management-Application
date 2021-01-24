const moment = require('moment');
const numberWithCommas = require('../utils');

module.exports = ({ basic, hRent, bonus, profTax, provFund, incomeTax, net_salary, pf, convence, medical,
    contactNo, fullName, bankName, bankAC, empID, gender,
    DOB, location, role, team,
    from, to,
}) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const gross_income = Number(basic) + Number(hRent) + Number(bonus) + Number(pf);
    const gross_deduction = Number(profTax) + Number(incomeTax) + Number(provFund) + Number(convence) + Number(medical);

    return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
         font-size: 16px;
         line-height: 24px;
         font-family: "Helvetica Neue", "Helvetica";
       }
       
       .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         border-top: 1px solid black;
         border-left: 1px solid black;
         border-right: 1px solid black;
       }
       
       .invoice-box table td {
         padding: 5px;
         border: 1px solid black;
       }
       .invoice-box table th{
         padding: 5px;
         border: 1px solid black;
       }
        </style>
     </head>
     <body>
     <div class="invoice-box">
     <p>Print date : ${today}</p>
     <table style="border-bottom:1px solid black" cellpadding="0" cellspacing="0">
         <tr>
             <th style="text-align:center;font-size:larger;padding:10px 0" colspan="4">Hackerearth Platform</th>
         </tr>
         <tr>
             <th style="text-align:center" colspan="4">Salary Slip from ${moment(from).format('ll')} to ${moment(to).format('ll')}</th>
         </tr>
         <tr>
             <th>Employee Id</th>
             <td>${empID}</td>
             <th>Gender</th>
             <td>${gender.charAt(0).toUpperCase() + gender.slice(1)}</td>
         </tr>
         <tr>
             <th>Personal No.</th>
             <td>${contactNo}</td>
             <th>Name</th>
             <td>${fullName}</td>
         </tr>
         <tr>
             <th>Bank Name</th>
             <td>${bankName}</td>
             <th>Bank A/c No.</th>
             <td>${bankAC}</td>
         </tr>
         <tr>
             <th>DOB</th>
             <td>${moment(DOB).format('L')}</td>
             <th>Locaction</th>
             <td>${location}</td>
         </tr>
         <tr>
             <th>Role</th>
             <td>${role}</td>
             <th>Team</th>
             <td>${team}</td>
         </tr>
     </table>

     <table style="margin-top:35px;border-bottom:1px solid black" cellpadding="0" cellspacing="0">
         <tr>
             <th>Earnings</th>
             <th>Amount in Rs.</th>
             <th>Deduction</th>
             <th>Amount in Rs.</th>
         </tr>
         <tr>
             <td>Basis</td>
             <td>${numberWithCommas(basic)}</td>
             <td>Provided Fund</td>
             <td>${numberWithCommas(provFund)}</td>
         </tr>
         <tr>
             <td>House rent allowance</td>
             <td>${numberWithCommas(hRent)}</td>
             <td>Professional tax</td>
             <td>${numberWithCommas(profTax)}</td>
         </tr>
         <tr>
             <td>Bonus</td>
             <td>${numberWithCommas(bonus)}</td>
             <td>Income Tax</td>
             <td>${numberWithCommas(incomeTax)}</td>
         </tr>
         <tr>
             <td>Privided Fund</td>
             <td>${numberWithCommas(pf)}</td>
             <td>Convence</td>
             <td>${numberWithCommas(convence)}</td>
         </tr>
         <tr>
             <td colspan="2"></td>
             <td>Medical Charges</td>
             <td>${numberWithCommas(medical)}</td>
         </tr>
         <tr>
             <th>Gross Earning</th>
             <td>${numberWithCommas(gross_income)}</td>
             <th>Gross Deduction</th>
             <td>${numberWithCommas(gross_deduction)}</td>
         </tr>
         <tr>
             <th style="text-align: right;" colspan="2">NET PAY</th>
             <td colspan="2">${'Rs. ' + numberWithCommas(gross_income - gross_deduction) + ' / -'}</td>
         </tr>
     </table>
     </div>
     </body>
  </html>
  `;
};
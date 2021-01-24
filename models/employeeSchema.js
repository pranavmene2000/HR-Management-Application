const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    bankName: {
        type: String,
    },
    bankAC: {
        type: String,
    },
    DOB: {
        type: String,
    },
    location: {
        type: String,
    },
    empID: {
        type: String,
        // required: true
    },
    fullName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    hireDate: {
        type: Date,
        required: true
    },
    payroll: [{
        basic: {
            type: String,
        },
        hRent: {
            type: String,
        },
        bonus: {
            type: String,
        },
        profTax: {
            type: String,
        },
        provFund: {
            type: String,
        },
        incomeTax: {
            type: String,
        },
        // gross_earn: {
        //     type: String,
        // },
        // gross_deduct: {
        //     type: String,
        // },
        userId: {
            type: String
        },
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        total_days: {
            type: String,
        },
        medical: {
            type: String,
        },
        pf: {
            type: String,
        },
        convence: {
            type: String,
        },
        net_salary: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employees', employeeSchema);
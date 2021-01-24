// const sam = [1,2,3,4];

// sam.map((elm,i) => {
//   console.log(elm,i);
// })
// console.log(typeof Math.random().toString(36).substring(7).toUpperCase())

// const sam = [
//     {_id : "1"},
//     {_id : "2"},
//     {_id : "3"},
//     {_id : "4"},
//     {_id : "5"},
//     {_id : "6"},
// ]
// sam.map(s => console.log(s._id))

// const bonus = '20'
// const tax = '300';
// console.log(parseInt(bonus) + parseInt(tax))

const errors =  [
    {msg : "one",param : "1"},
    {msg : "two",param : "2"},
    {msg : "three",param : "3"},
    {msg : "four",param : "4"},
]

console.log(errors.filter(err => err.msg === "one"))
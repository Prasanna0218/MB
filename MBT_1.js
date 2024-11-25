//Books list:-
let booklists=[
    {id:1,title:"Book1",price:200,stock:4},
    {id:2,title:"Book2",price:400,stock:5},
    {id:3,title:"Book3",price:150,stock:8},
    {id:4,title:"Book4",price:250,stock:7},
    {id:5,title:"Book5",price:100,stock:9},
    {id:1,title:"Book1",price:200,stock:6},
    {id:2,title:"Book2",price:400,stock:5},
    {id:4,title:"Book4",price:250,stock:7},
];

//Customer lists:-
let customerlist=[
    {id:101,name:"Name1",isExistingcustomer:true},
    {id:102,name:"Name2",isExistingcustomer:true},
    {id:103,name:"Name3",isExistingcustomer:false},
    {id:104,name:"Name4",isExistingcustomer:true},
    {id:105,name:"Name5",isExistingcustomer:false}
];

//Variables Of Selected Books and Customer Id:-
let Bookschosen=[1,2];
let customer=103;

//uniquebooks variable as globalusage:-
let uniquebooks=[];
let uniqueid=[];

//Function for unique Book list:-
let uniquebooklist=()=>{
    for(let book of booklists)
    {
        if(!uniqueid.includes(book.id))
        {
            uniquebooks.push(book);
            uniqueid.push(book.id);            
        }
    }
}
uniquebooklist();

//function for getting the customer Details:-
let customergiven=null;
let customerdetails=()=>{
    for(let eachcustomer of customerlist)
    {
        if(customer===eachcustomer.id)
        {
            customergiven=eachcustomer
        }
    }
}

customerdetails();

//Function for getting the books which are chosen by the customer:-
let chosenbookslist=[];
let chosenbooks=()=>{
    Bookschosen.map((element)=>{
        for(let books of uniquebooks)
        {
            if(element===books.id)
            {
                chosenbookslist.push(books)
            }
        }
    })
}
chosenbooks();

//function for calculating the total amount purchased for the discount calculating:-
let totalamount=0;
let totalamountcalculating=()=>{
    for(let books of chosenbookslist)
    {
        totalamount+=books.price;
    }
}
totalamountcalculating();

//function for the calculation and discount and adding props to objects:-
let selectedbooklist=[];
let discountcalculating=(selectedbook,discountvalue)=>{
    let discountedprice=(selectedbook.price)*(discountvalue/100);
    selectedbook.discountedprice=discountedprice;
    let finalprice=selectedbook.price-discountedprice;
    selectedbook.finalamount=finalprice;
    selectedbook.quantity=1;
    delete selectedbook.stock;
    selectedbooklist.push(selectedbook);
}

//expected o/p:-
// let selectedbooklist=[
//     {id: 1,title: 'Book1',price: 200,discountedprice: 20,finalamount: 180,quantity: 1},
//     {id: 2,title: 'Book2',price: 400,discountedprice: 40,finalamount: 360,quantity: 1}
//   ],

//function for calculating the totaldiscount amount:-
let discounttotal=0;
let discountedtotal=()=>{
    for(let selectebook of selectedbooklist)
    {
        discounttotal+=selectebook.discountedprice
    }
}

//function for the discount calculation based on user as well as total purchased amount:-
let billamount=()=>{
    for(let selectedbooks of chosenbookslist)
    {
        if(customergiven.isExistingcustomer==true)
        {
            discountcalculating(selectedbooks,15);
        }
        else if(customergiven.isExistingcustomer==false)
        {
            switch (true)
            {
                case totalamount>=100 && totalamount<200:
                    discountcalculating(selectedbooks,2);
                    break;
                case totalamount>=200 && totalamount<500:
                    discountcalculating(selectedbooks,5);
                    break;
                case totalamount>=500 && totalamount<750:
                    discountcalculating(selectedbooks,10);
                    break;
                case totalamount>750:
                    discountcalculating(selectedbooks,15);
                    break;
                default:
                    discountcalculating(selectedbooks,0);
            }
        }
    }
}
billamount();
discountedtotal();


//function for the final bill object:-
function bill()
{
    let bill={
        bill:{
            customername:customergiven.name,
            bookspurchased:selectedbooklist,
            totalprice:totalamount,
            totaldiscount:discounttotal
        }
    }   
    // console.log(JSON.stringify(bill,null,2));
    console.dir(bill ,{ depth: 23});
}
bill();

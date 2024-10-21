var num1 = 5;
var num2 =2;

console.log("the first number is : " + num1);
console.log("the second number is : " + num2);

console.log("the sum of the two numbers is :" +(num1 +num2));
console.log("the sub of the two numbers is :" +(num1 -num2));
console.log("the multi of the two numbers is :" +(num1 *num2));
console.log("the div of the two numbers is :" +(num1 /num2));
console.log("the mod of the two numbers is :" +(num1 %num2));


// var str="hello world";
// function show(){
// var input=document.getElementById('input').value;// innerhtml to access the element in the html
// var upper =input.toUpperCase();
// // console.log(upper);
// var rep=upper.replaceAll('o','y');
// // console.log(rep);
// var rev = rep.split('').reverse().join() // join convert the array of strings[h,e,l,l,o,w,o,r,l,d] that comes from split into string  hello world
// // console.log(rev);

// document.getElementById("result").innerHTML=`${upper} ------- ${rep} ------- ${rev}`
// }
// document.getElementById('btn').addEventListener("click",function(){
//     var input=document.getElementById('input').value;// innerhtml to access the element in the html
//     var upper =input.toUpperCase();
//     // console.log(upper);
//     var rep=upper.replaceAll('o','y');
//     // console.log(rep);
//     var rev = rep.split('').reverse().join() // join convert the array of strings[h,e,l,l,o,w,o,r,l,d] that comes from split into string  hello world
//     // console.log(rev);
    
//     document.getElementById("result").innerHTML=`${upper} ------- ${rep} ------- ${rev}`
// })

// document.getElementById("btn").addEventListener('click',function(){
//     var valueWeight = parseFloat(document.getElementById("weight").value);
//     var valueLength = parseFloat(document.getElementById("length").value)/100;
//     // Calculate BMI using kilograms and meters
//     var result = valueWeight / (valueLength * valueLength);
//     if(result<18)
//     {
//         document.getElementById("cat").innerHTML="نحافه";
//         document.getElementById("result").innerHTML=`${result}`
//     } else if (result >= 18 && result <= 24.9) 
//     {
//         document.getElementById("result").innerHTML=`${result}`
//         document.getElementById("cat").innerHTML="وزن مثالي";
//     }else if(result>=25 && result <=29.9)
//     {
//         document.getElementById("result").innerHTML=`${result}`
//         document.getElementById("cat").innerHTML="وزن زائد";
//     }else if(result>=30 && result<= 34.9)
//     {
//         document.getElementById("result").innerHTML=`${result}`
//         document.getElementById("cat").innerHTML="سمنه درجه اولي";
//     }
//     else if(result>=35 && result<= 39.9)
//         {
//             document.getElementById("result").innerHTML=`${result}`
//             document.getElementById("cat").innerHTML="سمنه درجه تانيه";
//         }
//     else
//         {
//             document.getElementById("result").innerHTML=`${result}`
//             document.getElementById("cat").innerHTML="سمنة خطيره";
//         }
// })

//get total
//create product
//save localstorage
//clear inputs
//read
//count -> to create numbers of the same product 
//delete
//update
//search
//clean data

let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mode ='create';
let tmp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit)
//get total of price
function getTotal(){
    // console.log("done")
    if(price.value !='')
    {
        let result =(+price.value+ +taxes.value+ +ads.value)- +discount.value; //+price to convert the price to number 
        total.innerHTML=result;
        total.style.background='#040'
    }else
    {
        total.innerHTML="";
        total.style.background='#a00d02'
    }
}

//create product // easy way to save the data in array it allow me to delete and make loop and add on it  if i want to save data in the local storge i take the data from array
let dataProduct
if(localStorage.product != null)
{
    dataProduct=JSON.parse(localStorage.product)
}else
{
    dataProduct=[];
}
// let dataProduct=[];
submit.addEventListener("click",function(event){
    event.preventDefault();
    let newProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    //count
    if(title.value!='' && price.value!='' && category.value!='' && newProduct.count<=100)
    {
    if(mode==='create')
    {
        if(newProduct.count>1)
            {
                for(i=0 ; i<newProduct.count;i++)
                {
                    dataProduct.push(newProduct);
                }
            }else
            {
                dataProduct.push(newProduct)
            }
    }else
    {
        dataProduct[tmp]=newProduct;
        mode='create';
        submit.innerHTML='create';
        count.style.display='block'
    }
clearData();

}
    // dataProduct.push(newProduct)
    localStorage.setItem('product',JSON.stringify(dataProduct))
    console.log(dataProduct)
showData();
})

// clear inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

//read data in table 

function showData(){
    let table='';
    for(let i =0 ;i<dataProduct.length;i++)
    {
        table+=`<tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].category}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].discount}</td>
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button onclick ="deleteData(${i})"id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll')
    if(dataProduct.length>0){
        btnDelete.innerHTML=`
        <td><button onclick = "deleteAll()">deleteAll(${dataProduct.length})</button></td>
        `
    }else
    {
        btnDelete.innerHTML='';
    }
    getTotal();
}
showData()
//delete
function deleteData(i){
    dataProduct.splice(i,1) //delete the id of i -- 1-> is the number of element to delete here will remove from the array
    localStorage.product=JSON.stringify(dataProduct);
    showData(); // to display the elemnts again after deleting without reload the page
}

function deleteAll(){
    dataProduct.splice(0);
    localStorage.clear();
    showData()
}

function updateData(i){
    // console.log(i)
    title.value = dataProduct[i].title;
    price.value=dataProduct[i].price
    taxes.value=dataProduct[i].taxes
    ads.value=dataProduct[i].ads
    discount.value=dataProduct[i].discount
    category.value=dataProduct[i].category
    getTotal();
    count.style.display='none';
    submit.innerHTML='update'
    mode='update'
    tmp=i;
    scroll({
        top: 0,
        behavior:'smooth'
    })
}

//search
let searchMode='title';

function getSearchMode(id){
    // console.log(id);
    let search= document.getElementById('search')
    if(id=='searchTitle')
    {
        searchMode='title';
    }else
    {
        searchMode='category'
    }
    search.placeholder='Search By ' +searchMode;

search.focus()
search.value='';
showData()
    // console.log(searchMode);
}

function searchData(value){
    // console.log(value);
    let table='';
    for(let i=0 ;i<dataProduct.length ;i++){
    if(searchMode =='title')
    {
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table+=`<tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].discount}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button onclick ="deleteData(${i})"id="delete">Delete</button></td>
                </tr>`;
                // console.log(i)
            }
        
    }else
    {
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table+=`<tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].discount}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button onclick ="deleteData(${i})"id="delete">Delete</button></td>
                </tr>`;
                // console.log(i)
            }
        }
    document.getElementById('tbody').innerHTML=table;
}
}
//clean data

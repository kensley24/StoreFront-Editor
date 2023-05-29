const e = require("express");

function addVendor(){
    
    let newVendor = {};
    newVendor["name"] = document.getElementById("name").value;
    newVendor["delivery_fee"] = document.getElementById("del_fee").value;
    newVendor["min_order"] = document.getElementById("min_order").value; 
    console.log(newVendor);

   

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 400){
            alert("please fill out all forms");
        }
        else if(this.readyState === 4 && this.status === 200){
            alert("your vendor has been added");
        }
    }
    req.open("POST", "vendors");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(newVendor));


}
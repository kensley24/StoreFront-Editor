//xml put request to update vendor page data
function saveChanges(idcount, id){
    //object to send to the server
    let obj = {}

    //updating item

    //which category to put the new item
    obj.catid = document.getElementById("categorySelect").value;
    //supply id
    obj.supid = idcount;
    //item name
    obj.cname = document.getElementById("cname").value;
    //item description
    obj.desc = document.getElementById("desc").value;
    //item price
    obj.price = document.getElementById("price").value;
    //item stock 
    obj.stock = document.getElementById("stock").value;

    //updating vendor
    //vendor name
    obj.vname = document.getElementById("vname").value;
    //vendor delivery fee
    obj.del_fee = document.getElementById("del_fee").value;
    //vendor minimum order
    obj.min_order = document.getElementById("min_order").value;
    


    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            alert("please refresh page to see your new item / updated vendor");
        }
        
    }
    console.log("in save id: " +id);
    req.open("PUT", id);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(obj));

}
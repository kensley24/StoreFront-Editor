const e = require("express");
const express = require("express");
const fs = require("fs");
const pug = require("pug");

let app = express();

let vendors = [];
//number of vendors
let n = 2;

//reading vendor data from the file
fs.readdir('vendors', function(err, files){
  if(err){
    console.log(err);
  }

  let i = 0;
  files.forEach((file) => {
    let fileName = 'vendors/'+file;

    fs.readFile(fileName, function(err, data){
      if(err){
        console.log(err);
      }
      let vendorData = JSON.parse(data);
      vendors[i] = vendorData;
      vendors[i].id = i;
    
      i++;
    });
    
  });
  

});

//let id; 

//to set up pug files to render
app.set("view engine", "pug");
app.set("views", "./views");
//serving public files
app.use(express.static("public"));
//making json objects usable
app.use(express.json());
//another way of getting params
/*
app.use(function(req, res, next){
	urlArr = req.url.split('/');
	id = urlArr[2];
	
	next();
});
*/

//home page
app.get("/", (req, res)=>{
  res.render("pages/home", {});
 
});

//vendors page
app.get("/vendors", (req, res)=>{
    let vendorKeys = Object.keys(vendors);
    res.format({
      'text/html': function() { res.render("pages/vendors", {vendor: vendors});},
      'application/json': function(){res.json(vendorKeys);},
      default: function(){res.status(406).send('Not Acceptable');} 
    });
    
});
//adding a vendor
app.get("/addVendor",(req, res,)=>{
    res.render("pages/addVendor", {});
});

//posting vendor data from an xml request
app.post("/vendors", (req, res)=>{
  //updating vendor length
  n++;
  let reqObj = req.body
  for(let k in reqObj){
    if(reqObj[k] === ""){
      console.log("error found")
      res.status(400).send();
    }
  }
  
  vendors[n] = reqObj;
  vendors[n].id = n;
  //default categories
  vendors[n].supplies = {"Whiteboards":{"0":{"name":"Cork Board","description":"Nunc sed orci lobortis augue","stock":7,"price":19},"1":{"name":"Glass Dry-Erase Board","description":"nisl. Quisque fringilla euismod enim.","stock":2,"price":149},"2":{"name":"Planning Board","description":"arcu. Sed et libero. Proin","stock":19,"price":11.99}},"Organizers":{"3":{"name":"Desk Pad","description":"euismod enim. Etiam gravida molestie","stock":4,"price":4.5},"4":{"name":"Document Holder","description":"lobortis quis, pede. Suspendisse dui","stock":19,"price":5.99},"5":{"name":"Cubicle Hook","description":"lobortis quam a felis ullamcorper","stock":11,"price":1.99}},"Paper":{"6":{"name":"Coloured Printer Paper","description":"sed pede. Cum sociis natoque","stock":6,"price":7},"7":{"name":"Photo Paper","description":"Nunc laoreet lectus quis massa.","stock":19,"price":17.7},"8":{"name":"Thermal Roll","description":"Donec egestas. Duis ac arcu.","stock":4,"price":6.99}},"Craft Supplies":{"9":{"name":"Stickers (pack of 100)","description":"luctus ut, pellentesque eget, dictum","stock":60,"price":3.99},"10":{"name":"Pom Poms (pack of 300)","description":"Nam ac nulla. In tincidunt","stock":3,"price":8},"11":{"name":"Glitter Glue (300ml)","description":"interdum enim non nisi. Aenean","stock":40,"price":5.99}},"Writing Supplies":{"12":{"name":"Highlighters (pack of 5)","description":"Phasellus dolor elit, pellentesque a,","stock":19,"price":7.95},"13":{"name":"Blue Ink Pens (pack of 10)","description":"fames ac turpis egestas. Aliquam","stock":3,"price":11.5},"14":{"name":"Sharpie Markers (pack of 3)","description":"aliquet odio. Etiam ligula tortor,","stock":5,"price":5.99},"15":{"name":"Pen Refills (pack of 20)","description":"semper, dui lectus rutrum urna,","stock":67,"price":10.58}},"Storage":{"16":{"name":"Storage Box","description":"at auctor ullamcorper, nisl arcu","stock":9,"price":5.78},"17":{"name":"Binding Cases (pack of 10)","description":"penatibus et magnis dis parturient","stock":39,"price":7.99},"18":{"name":"File Storage Drawer","description":"Pellentesque ut ipsum ac mi","stock":2,"price":46.5},"19":{"name":"Portable Plastic File/Storage Box","description":"rhoncus. Proin nisl sem, consequat","stock":5,"price":16.79}},"Security":{"20":{"name":"Key Cabinet","description":"mus. Donec dignissim magna a","stock":1,"price":115},"21":{"name":"Key Safe","description":"cursus. Integer mollis. Integer tincidunt","stock":5,"price":57.99}}};
  
  res.send();

});

//creating unique vendor page 
app.get("/vendors/:id", (req, res)=>{
  let id = req.params.id;
  
  res.format({
    'text/html': function(){
      let idCount = 0;
      if(vendors.length >= id){
        let s = vendors[id].supplies;
        for(let i in s){
          let cat = s[i];
          idCount += Object.keys(cat).length;
        }
        res.render("pages/vendorId", {vendor: vendors[id], idcount: idCount, id: id});
      }
      else{
        res.status(404).send('invalid param');
      }
    
    },
    'application/json': function(){
      res.json(vendors[id]);
    },
    default: function() {res.status(406).send('Not Acceptable')}
  })
  
});

//putting data into the supplies from xml request
app.put("/vendors/:id", (req, res)=>{
  let id = req.params.id;
  
  if(vendors.length >= id){
    let body = req.body;

    //updating a new item
    
    let sup = Object.keys(vendors[id].supplies);
    if(sup.length >= body.catid){
      
      let cat = sup[body.catid];
      let supply = vendors[id].supplies[cat];
      
      let supObj = {name: body.cname, description: body.desc, stock: body.stock, price: body.price}
      
      supply[body.supid] = supObj;
      
    }
    else{
      res.status(404).send("somthing went wrong...");
    }
    //updating vendor info
    vendors[id].name = body.vname;
    vendors[id].min_order = body.min_order;
    vendors[id].delivery_fee = body.del_fee;

    res.send();
  }
  else{
    res.status(404).send("invalid param");
  }


});

app.listen(3000);
console.log("Server listening at http://localhost:3000");
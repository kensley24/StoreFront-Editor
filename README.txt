Vendor Website
author: Kensley Schonauer 101183280

A website that lets you modify vendor information 

files: 

-server.js

views
    pages
    -addVendor.pug
    -home.pug
    -vendorId.pug
    -vendors.pug
    -style.css

    parials
    -header.pug

vendors
-grand.json
-indigo.json
-staples.json

public
-add.js
-save.js

compile/run instructions
1. download pug using npm
    in terminal 
    -npm install pug

    download express using npm
    in terminal 
    -npm install express

2. run server in terminal
    -node server.js
3. follow given url in a browser

how to use
-in the welcome page:
    click on the link vendors or add vendor
-vendors
    click on any vendor to see their information 
    -you are able to update vendor information or add
    item to a vendor 
    -press save and refresh page to see your updated information

-add vendor
    enter info to make a new vendor and go back to the vendors page to 
    see your newly created vendor


design choices

-in vendor id page: 
    3 divs: left = vendor information
            middle = item/category information
            right = save button

        placed each div using float display so that the user could edit information
        at the top of the page

    made the background colour orange and some of the divs a different shade of orange 
    to make it visually appealing (depending on if you like orange)

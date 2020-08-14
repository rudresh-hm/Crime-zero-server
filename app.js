let express=require('express');
let app=express();
app.set("view engine","ejs");
let cors = require('cors');
// SUPERMAN THOR ROBIN IRONMAN GHOSTRIDER CAPTAINAMERICA FLASH
// WOLVERINE
// BATMAN HULK BLADE PHANTOM SPIDERMAN BLACKWIDOW HELLBOY PUNISHER
// we store all superhero names in an array.
const superheroArr=["SUPERMAN","THOR","ROBIN","IRONMAN","GHOSTRIDER","CAPTAINAMERICA","FLASH","WOLVERINE","BATMAN","HULK","BLADE","PHANTOM","SPIDERMAN","BLACKWIDOW","HELLBOY","PUNISHER"];
//we map all the alphabets to their corresponding numbers according to old style keypad.
const alphanumMap={A:"2",B:"2",C:"2",
    D:"3",E:"3",F:"3",
    G:"4",H:"4",I:"4",
    J:"5",K:"5",L:"5",
    M:"6",N:"6",O:"6",
    P:"7",Q:"7",R:"7",S:"7",
    T:"8",U:"8",V:"8",
    W:"9",X:"9",Y:"9",Z:"9",
}
let superheroCodeARR=[];
/* Problem: When the user sends the code in the request body to the server, 
we have to map the code to the corresponding superhero and send the same as response.

Idea behind the algorithm: Instead of finding out all the possible words for that particular 
code whichwould take O(n!) and then search for the correct name, what we do is create a array
of codes corresponding to all the  superheros in the array 'superheroArr' now we just have to 
search the code sent in the request with our mapped array which will have the running time of O(n).
*/

// funtion to map all the super heroes to their SMS code
function mapStringToCode(shArr){
    let resultArr=shArr.map((item)=>{
        let code="0 "
        for(let i=0;i<item.length;i++){
            code=code+alphanumMap[item[i]];
        }
        return code;
    });
    return resultArr;
}
// now we call the function with superheroArr as the parameter
superheroCodeARR=mapStringToCode(superheroArr);
app.use(cors());
app.get("/",function(req,res){
    res.render("home");
});
app.get("/:id",function(req,res){
    let code=req.params.id;
    if(code[0]!="0"){
        res.json({superhero: "",err:"Ivalid SMS code use 0<space><code>format"});
    }
    else{
        let index=superheroCodeARR.indexOf(code);
        if(index==-1){
            res.json({superhero: "",err:"No such superhero, check your code"});
        }
        else{
            console.log(superheroArr[index]);
            res.json({ superhero: superheroArr[index],err:""});
        }
    }
    
    
})
app.listen(8000,()=>console.log("sever running at port 8000"));
import { log } from 'console';
import fs from 'fs';
import { url } from 'inspector';

const generateUUID = () =>{ //Genera un Id aleatorio
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export const registerUser = async(req,res)=>{
    const {completeName,email,password} = req.body;
    let user = {};
    let users = [];
    if(completeName && email && password){
        const id = generateUUID();
        user = {
            completeName:completeName, email:email, password:password
        }
        console.log(user);
        
        //Chequear como escribir y leer usuarios en un archivo .json
        fs.readFile('./server/data/users.json',(error,data)=>{
            if(error) throw error;
            let results = JSON.parse(data);
            
        })


        fs.appendFile('./server/data/users.json',JSON.stringify(user),(error,res)=>{
            if(error){
                throw error;
            } 
            console.log('Saved');
        })
        res.json({success:true,msg:`${user.email} saved`})
    }  
}

export const authenticateUser = (req,res) =>{
    const {email,password} = req.body;
    let accounts;
    if(email && password){
        fs.readFile('./server/data/users.json','utf-8',(err,data)=>{
            if(err) throw err;
            const info = JSON.parse(data);
            console.log(info);
            
        })
        //console.log(accounts);
    }

}
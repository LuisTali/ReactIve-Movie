import { log } from 'console';
import fs from 'fs';

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
    let favMovies = [];
    let info;
    if(completeName && email && password){
        
        const idUser = generateUUID();
        user = {
            idUser:idUser, completeName:completeName, email:email, password:password, favMovies:favMovies
        }

        const reading = fs.readFileSync('./server/public/users.json','utf-8');
        if(reading){
            users = JSON.parse(reading); 
        }
        
        users.push(user);

        const data = JSON.stringify(users);

        fs.writeFile('./server/public/users.json',data,(error,res)=>{
            if(error){
                throw error;
            } 
            else console.log('Saved');
        });

        res.json({success:true,users});
    }  
}

export const authenticateUser = (req,res) =>{
    const {email,password} = req.body;
    let accounts = [];
    let loggedUser;
    if(email && password){

        const reading = fs.readFileSync('./server/public/users.json','utf-8')
        accounts = JSON.parse(reading);
        
        loggedUser = accounts.find((obj) => obj.email == email && obj.password == password);
    }
    if(loggedUser){
        res.status(200).json({success:true,loggedUser});
    }else{
        res.status(200).json({success:false,msg:'No user with that credentials'})
    }  
}

export const addMovieToFavorite = (req,res) =>{
    const {movie} = req.body;
    let accounts;
    if(movie){
        const reading = fs.readFileSync('./server/public/users.json','utf-8')
        accounts = JSON.parse(reading);
        accounts.map((user) =>{
            if(user.idUser == movie.idUser){
                user.favMovies.forEach((idMovie) => { //Agregado recientemente
                    if(idMovie == movie.id) return null;   //Agregado recientemente
                });  //Agregado recientemente
                user.favMovies.push(movie.id);
            }
        })
        const data = JSON.stringify(accounts);
        fs.writeFile('./server/public/users.json',data,(error,res)=>{
            if(error){
                throw error;
            } 
            else console.log('Saved');
        });

    }else{
        console.log('does not exist');
    }
}

const getIndexOfUser = (accounts,idUser) =>{
    for(let i = 0; i < accounts.length; i++){
        if(accounts[i].idUser == idUser) return i;
    }
}

export const removeMovieFromFavorite = (req,res) =>{
    const {id,idUser} = req.body;
    let accounts;
    if(id){
        const reading = fs.readFileSync('./server/public/users.json','utf-8')
        accounts = JSON.parse(reading);
        let index = getIndexOfUser(accounts,idUser);
        accounts[index].favMovies = accounts[index].favMovies.filter((movie) => movie != id);
        const data = JSON.stringify(accounts);
        fs.writeFile('./server/public/users.json',data,(error,res)=>{
            if(error){
                throw error;
            } 
            else console.log('Saved');
        });
        res.json({movies:accounts[index].favMovies})
        /*accounts.map((user)=>{
            user.favMovies.filter((movie) =>{
                movie != id;
            })
        })*/
    }
    //res.status(200).json({})
}
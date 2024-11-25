'use strict';


const teachers = [
    {
        userName:"sameer01",
        pwd:"Sam1234"
    },
    {
        userName:"sinha01",
        pwd:"Sinha001"
    }
];

document.getElementById("loginButton").addEventListener('click',login);
function login(){
    const username=document.getElementById("username").value;
    const pwd = document.querySelector("#pwd").value;
    const errMsg = document.querySelector("#errorMessage");

    teachers.filter(user=>{
        if(user.userName.trim()===username.trim() && user.pwd.trim()===pwd.trim()){
            window.open("dashboard.html");
        }else{
            errMsg.innerText="username or password is incorrect";
            document.getElementById("username").value="";
            document.querySelector("#pwd").value="";
        }
    });
}
  
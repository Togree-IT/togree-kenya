let resetpwdform = document.getElementById('resetpwdform');
let pwdbtn = document.getElementById('resetpwd');


document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('click',openandClose);

    const passwordEyes = document.querySelectorAll('.fa-eye');
    for(let Showpassword of passwordEyes){
            Showpassword.addEventListener('click',showAndHide)
    }

    let newpwd = resetpwdform.newpwd

    newpwd.addEventListener('change', e=>{
        ValidateInput(newpwd,e)
        

    })

    resetpwdform.addEventListener('submit', e=>{
        e.preventDefault();

       
    })


       

});

function openandClose(event){
    const pwdPopup = document.querySelector('#resetpopup');
    const closePopup = document.querySelector('#closepwdbtn');

        if( typeof event !== "undefined" && typeof event.target !== "undefined"){ 
                if(pwdbtn.contains(event.target)){
                    pwdPopup.classList.add('order-active');
                }else if(closePopup.contains(event.target)){
                    pwdPopup.classList.remove('order-active');
                }
        }
        
    
}


function showAndHide(event){

    let parentEle = event.currentTarget.parentElement;
    let Singleinput = parentEle.querySelector('.art_input')
    
        if(Singleinput.type === "password"){
             Singleinput.type = "text";
             event.currentTarget.className = "fas fa-eye-slash";
        }else{
            event.currentTarget.className = "fas fa-eye";
            Singleinput.type = "password";
        }
        
}


function ValidateInput(pwdinput,e){
    let parentError = e.currentTarget.parentElement.parentElement;
    let errormessage = parentError.querySelector('.error');
    let inputborder = e.currentTarget.parentElement;
    let submitbtn = document.querySelector('#pwdsubmitbtn');

    let requiredcharac = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;


    if( !requiredcharac.test(pwdinput.value) && pwdinput.value !== '' ){
       submitbtn.disabled = true;
       submitbtn.style.backgroundColor = '#24c3478f';
       errormessage.classList.add("error_active");
       errormessage.innerHTML = "password is either than 8 ,contains no capital letters"
       inputborder.style.border = '2px solid red';
    }else{
        submitbtn.style.backgroundColor = '#24C347';
        errormessage.classList.remove("error_active");
        inputborder.style.border = '1px solid #24C347';

    }




}

 

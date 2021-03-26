// Reset password form variables 
let resetpwdform = document.getElementById('resetpwdform');
const pwdPopup = document.querySelector('#resetpopup');
let submitbtn = document.querySelector('#pwdsubmitbtn');
let pwdbtn = document.getElementById('resetpwd');
let confirmnewpwd = resetpwdform.confirmnewpwd
let confirmnewpwdborder = confirmnewpwd.parentElement;
let confirmerror = document.querySelector('#thirderror');
let currentpwd = resetpwdform.currentpwd;
let currentpwdborder = currentpwd.parentElement;
let currentEror = document.querySelector('#firsterror');
let newpwd = resetpwdform.newpwd
let parentError = newpwd.parentElement.parentElement;
let errormessage = parentError.querySelector('.error');
let inputborder = newpwd.parentElement;
// Reset password form variables starts here 


// Offer settings variables starts here 

const offerpopup = document.querySelector('#offerpopup');
const offerform = document.querySelector('#offerform');



// Offer settings variables ends here 








document.addEventListener('DOMContentLoaded', function() {


    // Reset password event listeners 
    window.addEventListener('click', openandClose);

    const passwordEyes = document.querySelectorAll('.fa-eye');
    for (let Showpassword of passwordEyes) {
        Showpassword.addEventListener('click', showAndHide)
    }

    currentpwd.addEventListener('input', e => {
        checkempty(currentpwd, currentEror, currentpwdborder)
    });


    newpwd.addEventListener('change', e => {
        ValidateInput(e);
    });


    confirmnewpwd.addEventListener('input', e => {
        checkempty(confirmnewpwd, confirmerror, confirmnewpwdborder)

    })


    confirmnewpwd.addEventListener('change', e => {

        if (confirmnewpwd.value !== newpwd.value) {
            novalidity(confirmnewpwdborder, confirmerror, "Please check your password", confirmnewpwd, false)
        } else {
            novalidity(confirmnewpwdborder, confirmerror, "", confirmnewpwd, true)
        }
    })



    resetpwdform.addEventListener('submit', e => {
            e.preventDefault();

            if (currentpwd.value !== '' && newpwd.value !== '' && confirmnewpwd.value !== '') {

                let { currentpwd, newpwd, confirmnewpwd } = resetpwdform;
                let pwddata = { currentpwd: currentpwd.value, newpwd: newpwd.value, confirmnewpwd: confirmnewpwd.value }

                axios.post(path + 'admin/resetPassword', pwddata)
                    .then(res => {
                        if (res.data) {

                            if (typeof res.data.status !== 'undefined' && res.data.status === 'success') {
                                M.toast({
                                    html: "Passowrd change Successfull"
                                })

                                pwdPopup.classList.remove('order-active')
                                resetpwdform.reset();

                            } else {
                                M.toast({
                                    html: "Password change wasn't Successful"
                                })
                            }
                        }
                    })


            } else {
                if (currentpwd.value === '') {
                    novalidity(currentpwdborder, currentEror, "This field is required", currentpwd, false);
                }
                if (newpwd.value === '') {
                    novalidity(inputborder, errormessage, "This field is required", newpwd, false);
                }
                if (confirmnewpwd.value === '') {
                    novalidity(inputborder, confirmerror, "This field is required", confirmnewpwd, false);
                }

            }


        })
        // reset password eventlisteners ends here 

    // offer settings eventlisteners starts here

    const productName = document.querySelector('#productname');
    M.FormSelect.init(productName);
    let productNamevalue = (M.FormSelect.getInstance(productName)).input.value;




    offerform.addEventListener('submit', e => {
        e.preventDefault();
        let { costprice, sellingprice, minqty, maxqty, secminqty, secmaxqty, trdminqty, trdmaxqty } = offerform;
        let offerdata = { productNamevalue, costprice: costprice.value, sellingprice: sellingprice.value, minqty: minqty.value, maxqty: maxqty.value, secminqty: secminqty.value, secmaxqty: secmaxqty.value, trdminqty: trdminqty.value, trdmaxqty: trdmaxqty.value }
        console.log(offerdata);

        axios.post(path + 'admin/createOffer', offerdata)
            .then(res => {
                if (res.data) {

                    if (typeof res.data.status !== 'undefined' && res.data.status === 'success') {
                        M.toast({
                            html: "Offer created Successfull"
                        })

                        offerpopup.classList.remove('order-active')
                        offerform.reset();

                    } else {
                        M.toast({
                            html: "Offer Creation wasn't Successful"
                        })
                    }
                }
            })



    })


});


// Reset password functions 

function checkempty(targetInput, errormes, pareborder) {
    if (targetInput.value !== '') {
        errormes.innerHTML = ''
        pareborder.style.border = '1px solid #24C347';
    }
}

function openandClose(event) {

    const closePopup = document.querySelector('#closepwdbtn');
    const editoffer = document.querySelector('#editoffer');
    const closeOffer = document.querySelector('#closeoffer');


    if (typeof event !== "undefined" && typeof event.target !== "undefined") {
        if (pwdbtn.contains(event.target)) {
            pwdPopup.classList.add('order-active');
        } else if (closePopup.contains(event.target)) {
            pwdPopup.classList.remove('order-active');
        } else if (editoffer.contains(event.target)) {
            offerpopup.classList.add('order-active');
        } else if (closeOffer.contains(event.target)) {
            offerpopup.classList.remove('order-active')
        }
    }


}

function showAndHide(event) {

    let parentEle = event.currentTarget.parentElement;
    let Singleinput = parentEle.querySelector('.art_input')

    if (Singleinput.type === "password") {
        Singleinput.type = "text";
        event.currentTarget.className = "fas fa-eye-slash";
    } else {
        event.currentTarget.className = "fas fa-eye";
        Singleinput.type = "password";
    }

}


function ValidateInput() {

    if (currentpwd.value === '' && newpwd.value !== '') {
        novalidity(currentpwdborder, currentEror, "Please enter your current password", currentpwd, false);
    } else if (newpwd.value !== '' && currentpwd.value !== '') {

        let numcheck = /[0-9]/;
        let lowerletter = /[a-z]/;
        let capitalletter = /[A-Z]/;

        if (newpwd.value.length < 8) {
            novalidity(inputborder, errormessage, "Your password must be more 8 or more", newpwd, false);
        } else if (!numcheck.test(newpwd.value)) {
            novalidity(inputborder, errormessage, "Your password must contain at least a number", newpwd, false);
        } else if (!lowerletter.test(newpwd.value)) {
            novalidity(inputborder, errormessage, "Your password must contain at least a lowerletter", newpwd, false);
        } else if (!capitalletter.test(newpwd.value)) {
            novalidity(inputborder, errormessage, "Your password must contain at least a capital letter", newpwd, false);
        } else if (currentpwd.value === newpwd.value) {
            novalidity(inputborder, errormessage, "Your password must not be as previous", newpwd, false);
        } else {
            if (currentpwd.value !== newpwd.value) {
                novalidity(confirmnewpwdborder, errormessage, "", confirmnewpwd, false)
            }

            novalidity(confirmnewpwdborder, confirmerror, "Confirm your password", confirmnewpwd, false)

        }

    } else {
        novalidity(confirmnewpwdborder, confirmerror, "Confirm your password", confirmnewpwd, false)

    }

}

// checking validity
function novalidity(inputbod, emessage, whattotell, targetwd, bool) {
    if (bool === false) {
        submitbtn.disabled = true;
        submitbtn.style.backgroundColor = '#24c3478f';
        inputbod.style.border = '2px solid red';
        emessage.innerHTML = whattotell;
        targetwd.focus();
    } else {
        submitbtn.disabled = false;
        submitbtn.style.backgroundColor = '#24C347';
        emessage.innerHTML = whattotell;
        inputbod.style.border = '1px solid #24C347';


    }

}
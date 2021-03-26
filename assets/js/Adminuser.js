let downloadable;


document.addEventListener('DOMContentLoaded', function() {



    const userwrapper = document.querySelector('#userwrapper');

    function userTemp(data) {
        return `
                            <div class="table__row">
                                <div class="table_cell">
                                    <span>${data.customer_ID}</span>
                                </div>
                                <div class="table_cell">
                                    <span>${data.role}</span>
                                </div>
                                <div class="table_cell" id="status-heading">
                                    <span>${data.registered_date}</span>
                                </div>

                                <div class="table_cell">
                                    <i id="${data.customer_ID}" onclick="moreInfo(event)" class="material-icons infobtn">more_vert</i>

                                    <div class="more_information sidepop" id="sidepopup">
                                        <a class="information_links" onclick="userinformation(event,'${data.email}','${data.customer_ID}')"> User Details</a>
                                        <a class="information_links" onclick="resetpassword(event,'${data.email}','${data.customer_ID}')" href="#"> Reset Password</a>
                                        <a href="/admin/orders" class="information_links"> Order for User</a>
                                        <span class="useremail" id="${data.email}"></span>
                                    </div>

                                </div>

                            </div>`;
    }

    let startPage = 4,
        prevPage = -4,
        pagenext;

    axios.get('../assets/data/userData.json')
        .then(data => {

            data = data.data;

            function replacer(key, value) {
                if (value == null || value.constructor != Object) {
                    return value
                }
                return Object.keys(value).sort().reduce((s, k) => { s[k] = value[k]; return s }, {})
            }

            downloadable = data || JSON.stringify(data, replacer(), null);




            if (data.length) {

                pagenext = Math.ceil(((data.length) / startPage));

                // userwrapper.innerHTML = '';
                userwrapper.querySelectorAll('.table__row').forEach(row => row.remove());

                data.map((data, index) => {

                    if (userwrapper) {
                        if (index <= startPage) {
                            return userwrapper.innerHTML += userTemp(data);
                        }
                    }

                });

                userwrapper.insertAdjacentHTML("afterEnd", " <div class='pagination'> <button id='prev'>Prev</button> <button id='next'>Next </button>  </div>")

                function next() {

                    let _length = data.length;
                    let i = startPage + 1;
                    startPage += 5;


                    if ((_length > startPage) || _length === startPage) {


                        userwrapper.querySelectorAll('.table__row').forEach(row => row.remove());


                        for (i; i < data.length; i++) {

                            let n_data = data[i];

                            if (userwrapper) {

                                if (i <= startPage) {
                                    userwrapper.innerHTML += userTemp(n_data);
                                }

                            }

                        }

                    } else {
                        console.log("No more Data available");
                    }
                    if (startPage > _length) {
                        startPage = _length - 1
                    }

                    // console.log(startPage);
                }

                function prev() {





                    console.log(startPage);
                    let _length = 0;
                    let i = startPage,
                        _o = 0;
                    startPage -= 5;



                    if (i > _length + 5) {
                        userwrapper.querySelectorAll('.table__row').forEach(row => row.remove());

                        for (i; i >= _length; i--) {


                            if ((startPage - i) > (startPage - 5) && _o++ < 5) {
                                if (userwrapper) {
                                    if (i <= startPage) {

                                        userwrapper.innerHTML += userTemp(data[startPage - i]);
                                    }
                                }
                            }


                        }

                    } else {
                        console.log(i);
                        // console.log(startPage);
                    }
                    if (startPage <= 0) {
                        startPage = 4;
                    }
                }

                let pareele = userwrapper.nextElementSibling;
                let next_ = pareele.querySelector("#next")
                let prev_ = pareele.querySelector("#prev")
                if (next_) {
                    next_.addEventListener('click', next);
                }
                if (prev_) {
                    prev_.addEventListener('click', prev);
                }


                exportcsv = document.querySelector('#exportcsv');
                exportcsv.addEventListener('click', e => {

                    downloadFiles(downloadable);
                    M.toast({
                        html: "Data Downloaded Successfully"
                    })
                })





            }


        })
        .catch(function(error) {
            console.log(error);
        });




})


function downloadFiles(downloadable) {

    let headers = Object.keys(downloadable[0]).map(key => { return key });

    console.log(headers);

    objectExporter({
        exportable: downloadable,
        type: 'csv',
        headers,
        fileName: 'UserData',
        // {/* headerStyle: <cssStyle>, */}
        //  {/* cellStyle: <cssStyle>, */}
        sheetName: 'UserData',
        documentTitle: 'UserData',
        documentTitleStyle: 'background-color: #24C347;',
        // {/* repeatHeader: <boolean>, // The table header repeat parameter */}
        columnSeparator: ',',

    })
}









function userinformation(e, email, id) {

    let userdetails = e.target;
    let customerid = id;
    let userboard = document.querySelector("#userboard");


    const boardinfo = (data) => {
        return `<div class="customerdetails__Wrapper" id="customerwrapper">

        <div class="customerdetails__header">
            <h4 class="customerdetails__title">Customer Details</h4>
            <i class="material-icons" id="closeuserinfo">close</i>
        </div>
    
        <div class="customerdetails__subhead" id="1">
    
            <h5 class="customerdetails__subtitle">Personal Information</h5>
    
            <div class="customerdetails__contentwrapper">
    
                <div class="customerdetails__content">
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Full Name </h6>
                        <p class="customerdetails__content__subtitle">${data.first_name} ${data.last_name}</p>
                    </div>
    
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Email Address</h6>
                        <p class="customerdetails__content__subtitle">${data.email}</p>
                    </div>
                </div>
    
                <div class="customerdetails__content">
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Phone Number </h6>
                        <p class="customerdetails__content__subtitle">${data.phone_number}</p>
                    </div>
    
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Customer ID</h6>
                        <p class="customerdetails__content__subtitle">${data.customer_ID}</p>
                    </div>
                </div>
            </div>
    
        </div>
    
    
        <div class="customerdetails__subhead" id="2">
    
            <h5 class="customerdetails__subtitle">Addresss Information</h5>
    
            <div class="customerdetails__contentwrapper">
    
                <div class="customerdetails__content">
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Apartment Address </h6>
                        <p class="customerdetails__content__subtitle">${data.Apartment_Address}</p>
                    </div>
    
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Country</h6>
                        <p class="customerdetails__content__subtitle" id="country">${data.Country}</p>
                    </div>
                </div>
    
                <div class="customerdetails__content">
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Landmark </h6>
                        <p class="customerdetails__content__subtitle">${data.Landmark}</p>
                    </div>
    
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">Postal Code</h6>
                        <p class="customerdetails__content__subtitle">${data.postal_code}</p>
                    </div>
    
                </div>
                <div class="customerdetails__content">
                    <div class="customerdetails__content__subcontent">
                        <h6 class="customerdetails__content__title">City </h6>
                        <p class="customerdetails__content__subtitle">${data.City}</p>
                    </div>
                </div>
            </div>
    
        </div>
    
    </div>`;



    };




    axios.get('../assets/data/userData.json')
        .then(data => {
            data = data.data
            if (data.length) {
                return data.map(data => {
                    if (data.customer_ID === customerid) {
                        userboard.innerHTML = '';
                        userboard.insertAdjacentHTML("afterbegin", boardinfo(data))

                    }

                    const closeuserinfo = document.querySelector("#closeuserinfo")
                    closeuserinfo.addEventListener('click', e => {
                        userboard.classList.remove('order-active');
                    })
                });




            }



        })
        .catch(function(error) {
            console.log(error);
        });

    userboard.classList.add('order-active');


}

function resetpassword(e, email, id) {

    let passwordresetData = { useremail: email, userid: id }

    axios.post(path + 'admin/resetUserPass', passwordresetData)

    .then(res => {
        if (res.data) {

            if (typeof res.data.status !== 'undefined' && res.data.status === 'success') {
                M.toast({
                    html: "User Password Reset Successfull"
                })

            } else {
                M.toast({
                    html: "User Password Reset Successful"
                })
            }
        }
    })



}



function moreInfo(e) {
    var targetUpper;
    let moreinfo = e.target;
    var popup;

    setTimeout(() => {
        // The trigger function for the popup
        function popEv(even) {
            targetUpper = even;
        }

        popup.addEventListener('click', popEv);

        // Add close event when click outsite the popup
        document.body.addEventListener('click', function bodEv(ev) {
            if (targetUpper !== ev) {
                popup.classList.remove('sidepop_active');
                document.body.removeEventListener('click', bodEv);
                popup.removeEventListener('click', popEv);
            }
        });
    }, 100);



    popup = moreinfo.nextElementSibling;
    if (typeof e !== "undefined" && typeof e.currentTarget !== "undefined") {
        popup.classList.add('sidepop_active');
    }

};
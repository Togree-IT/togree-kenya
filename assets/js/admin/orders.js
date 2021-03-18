// order form input variables

let statusEL = document.querySelector("#status")
let paymentEL = document.querySelector("#payment");
let submitBtn = document.querySelector('#createorder');
const createpage = document.getElementById('createpage');
let tablewrapper = document.querySelector("#orderwrapper");


// sort and dropdow variables
sortBtn = document.querySelector('#sort');
sortBtnSpan = document.querySelector('#sort span');
dropLinks = document.querySelectorAll(".droplist");



const orderDB = new openIDB("orderData", 1, function(upgradeDB) {

    switch (upgradeDB.oldVersion) {
        case 0:
            upgradeDB.createObjectStore("orderInformation", {
                keyPath: "orderid"
            })
        case 1:
            upgradeDB.transaction.objectStore("orderInformation").createIndex('oderid', 'orderid');
    }
});



// populateData(key);  
const orderDetails = new IDBmethods(orderDB, "orderInformation");

let imeiForm_wrapper = document.querySelector("#Imeipage");
let imeiForm = document.querySelector("#imeiform");



// table more info variables
more_infos = document.querySelectorAll(".more_info");

let customerwrapper = document.querySelector('#customerwrapper');

let CustomerDetailsInformation = document.querySelector("#CustomerDetailsInformation");
let orderdetails = document.querySelector("#orderdetails");
let shippingDetails = document.querySelector("#ShippingInformation");


let createbtn = document.getElementById("createorder");
let closebtn = document.querySelector("#closebtn");








document.addEventListener('DOMContentLoaded', function() {



    if (sortBtn) {
        window.addEventListener('click', sortAction);
    }

    window.addEventListener('click',toggleDash)


    const ordersForm = document.querySelector("#orderform");
    // initalizing materialize select input 
    M.FormSelect.init(statusEL);
    M.FormSelect.init(paymentEL);



    for (dropLink of dropLinks) {
        dropLink.addEventListener('click', chooseSort)
    }

    if (createbtn) {
        createbtn.addEventListener("click", viewForm);
        closebtn.addEventListener("click", viewForm);
    }

    orderDetails.getdata().then(orderInformation => {

        if (orderInformation.length) {
            function addNullImei(orderid) {
                return orderid.imei.trim() === '' ? 'NULL' : orderid.imei.split('\n').join('</br>')
            }

            function addNullImeiClass(orderid) {
                return orderid.imei.trim() === '' ? '' : 'text_left'
            }
            let index = 0;
            orderInformation.map(orderid => {
                if (tablewrapper) {
                    tablewrapper.innerHTML += ` 
                <div class="table__row">

                                <div class="table_cell">
                                <span >${orderid.orderid}</span>
                                </div>

                                <div class="table_cell">
                                    <span>1</span>
                                </div>

                                <div class="table_cell" id="customerdisplay">
                                    <span>${orderid.customerid}</span>
                                </div>

                                <div class="offonmobile table_cell " id="table_dropdown">
                                    <div class="input-field ">
                                        <select class="status" onchange="changeStatus(event,'${orderid.imei}','{orderid.status}')" data-selected="${orderid.status}" data-imei="${orderid.imei}"data-orderid="${orderid.orderid}">
                                        <option value="${orderid.status}" selected>${orderid.status}</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="offonmobile table_cell" id="Imei-table">
                                        <span class="offonmobile art_tb_imeis ${addNullImeiClass(orderid)} ">${addNullImei(orderid)}</span>
                                </div>
                                
                                <div class="table_cell more_info">

                                            <i class="material-icons more_info" onclick="popupInformation(event)">more_vert</i      
                                </div>

                                <div class="more_information">
                                                <a class="information_links" onclick = "popCustomerDetails(event, ${index++},'customer')" > Customer Details</a>
                                                <a class="information_links" href="#" onclick ="popCustomerDetails(event, ${index++},'order')"> Order Details</a>
                                                <a class="information_links" href="#" onclick ="popCustomerDetails(event, ${index++},'shipping')"> Shipping Details</a>          
                                                <i class="material-icons more_info closeinfo" onclick="closeInfo(event)" >close</i>
                                </div>

                </div>
                
                `;
                }
            })

            selectedStatus = document.querySelectorAll(".status");
            M.FormSelect.init(selectedStatus);
        }



    });


    if (ordersForm) {
        ordersForm.addEventListener('submit', e => {

            e.preventDefault();
            let status = (M.FormSelect.getInstance(statusEL)).input.value;
            let payment = (M.FormSelect.getInstance(paymentEL)).input.value;

            let {
                orderid,
                customerid,
                qty,
                imei
            } = ordersForm;

            let data = { orderid: orderid.value, customerid: customerid.value, qty: qty.value, imei: imei.value, status, payment };

            orderDetails.putdata(data).then(key => {

                populateData(key)
            })

            createpage.classList.remove("order-active");

            e.target.reset();
            // document.location.reload();
        });
    }




    function populateData(key) {

        orderDetails.getdata(key).then(orderid => {
            console.log(orderid);
            if (tablewrapper) {
                let options = [
                    "Confirmed", "Shipped", "Delivered", "Cancelled"
                ];

                function apllySelectedStatus() {
                    return options.includes(orderid.status) ? 'selected' : ''
                }

                function addNullImei(orderid) {
                    return orderid.imei.trim() === '' ? 'NULL' : orderid.imei.split('\n').join('</br>')
                }

                function addNullImeiClass(orderid) {
                    return orderid.imei.trim() === '' ? '' : 'text_left'
                }

                let temp = `
                                            <div class="table_cell">
                                                <span >${orderid.orderid} </span>
                                            </div>
                                        <div class="table_cell">
                                            <span>${orderid.qty}</span>
                                        </div>
                                        <div class="table_cell" id="customerdisplay">
                                            <span>${orderid.customerid}</span>
                                        </div>
                                        <div class="table_cell" id="table_dropdown">
                                            <div class="input-field ">
                                                <select class="status"  onchange="changeStatus(event,'${orderid.imei}','{orderid.status}')" data-selected="${orderid.status}" imei-data="${orderid.imei}" data-orderid="${orderid.orderid}">
                                                <option value="${orderid.status}" ${apllySelectedStatus()}>${orderid.status}</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="offonmobile table_cell" id="Imei-table">
                                            <span class=" offonmobile art_tb_imeis ${addNullImeiClass(orderid)}">${addNullImei(orderid)}</span>
                                        </div>

                                        <div class="table_cell">
                                            <i class="material-icons" id="more_info" onclick="popupInformation(event)">more_vert</i>
                                        </div>

                                            <div class="more_information">
                                                    <a class="information_links" onclick = "popCustomerDetails(event, ${index++},'customer')" > Customer Details</a>
                                                    <a class="information_links" href="#" onclick ="popCustomerDetails(event, ${index++},'order')"> Order Details</a>
                                                    <a class="information_links" href="#" onclick ="popCustomerDetails(event, ${index++},'shipping')"> Shipping Details</a>
                                                <i class="material-icons more_info closeinfo"  onclick="closeInfo(event)">close</i>
                                            </div>

                                        `;

                tablewrapper.insertAdjacentHTML("beforeend", temp);
                selectedStatus = document.querySelectorAll(".status");
                M.FormSelect.init(selectedStatus);
            } else {
                console.log('elememnt not founf');
            }



        })

    }

    
                
             

});


function viewForm(event) {
    console.log(event);
    orderDetails.getdata().then(data => {

        let _orderid = document.querySelector('#orderid');
        _orderid.type = 'hidden';
        _orderid.parentElement.parentElement.style.display = "none";
        _orderid.value = 'TG' + new Date().getFullYear() + '-' + (data.length + 1);

        let _customerid = document.querySelector('#customerid');
        _customerid.type = 'hidden';
        _customerid.parentElement.parentElement.style.display = "none";
        _customerid.value = 'TOG' + new Date().getFullYear() + '-' + (data.length + 1);
    })


    if (typeof event !== "undefined" && typeof event.currentTarget !== "undefined") {

        if (event.currentTarget.id === "createorder") {
            createpage.classList.add("order-active");
        }
        if (event.currentTarget.id === "closebtn") {
            createpage.classList.remove("order-active");
        }

    }

}




function sortAction(event) {

    sortDropdown = document.querySelector('#sortdrop');

    if (typeof event !== "undefined" && typeof event.target !== "undefined") {

        if (sortBtn.contains(event.target)) {
            sortDropdown.classList.add('order-active');
            sortBtn.classList.add('dropdown-active');
        } else {
            sortDropdown.classList.remove('order-active');
            sortBtn.classList.remove('dropdown-active');
        }

    }

}


function chooseSort() {
    console.log(this.innerText);
    if (!window.event.currentTarget.classList.contains('selected-dropdown')) {
        window.event.currentTarget.parentNode.querySelector(".droplist.selected-dropdown").classList.remove('selected-dropdown');
        window.event.currentTarget.classList.add('selected-dropdown');

        sortBtnSpan.innerText = this.innerText;
    }
}

function changeStatus(e, imei) {
    let curreelect = e.target;
    let prevSelected = curreelect.getAttribute('data-selected');
    imei = curreelect.getAttribute('data-imei');

    if (imei.trim() === '') {

        if (typeof e !== "undefined" && typeof e.target !== "undefined") {
            if (imeiForm_wrapper) {

                imeiForm_wrapper.classList.add("order-active");


                let imeiclosebtns = document.querySelectorAll("#imeiclose");
                for (let imeiclose of imeiclosebtns) {
                    imeiclose.onclick = function closeIMEIForrm(e) {

                        if (imeiForm_wrapper) {
                            curreelect.value = prevSelected;
                            let disp = curreelect.parentElement.querySelector('input');
                            disp.value = curreelect.value;
                            imeiForm_wrapper.classList.remove("order-active");
                        }

                    };
                }

                // Submit


                imeiform.onsubmit = function(e) {
                    e.preventDefault();
                    let orderID = curreelect.getAttribute('data-orderid');
                    if (imeiform.updateimei.value.trim() !== "") {
                        // This helps in reverrting to the default when form is cancelled
                        if (prevSelected !== curreelect.value) {
                            curreelect.setAttribute('data-selected', curreelect.value);
                        }
                        curreelect.setAttribute('data-imei', imeiform.updateimei.value);

                        orderDetails.updateProperty(orderID, 'imei', imeiform.updateimei.value)

                    }
                }


            }

        }
    }

}

function popupInformation(e) {

    let Infobtn = e.target;
    MoreInformation = Infobtn.nextElementSibling;


    if (typeof e !== "undefined" && typeof e.currentTarget !== "undefined") {
        if(Infobtn){
        MoreInformation.classList.add('order-active');

    
        }
    }

}

function popCustomerDetails(event, index, id) {

    let CustomerTarget = event.target;
    orderid = CustomerTarget.getAttribute('data-orderId');


    let listing = {
        customer: {
            title: "Customer Details",
            sub_titles: ['CustomerInformation', 'AddressInformation']
        },
        order: {
            title: "Order Details",
            sub_titles: ['ProductInformation', 'billingInformation']
        },
        shipping: {
            title: "Shipping Details",
            sub_titles: ['ShippingInformation', 'billingInformation']
        }
    }


    const CustomerInfo = (title, data) => {

        function requireMents(mapKey) {
            let reqTemp = ``;

            Object.keys(mapKey).map(key => {
                if (key !== 'title') {
                    reqTemp += `
                            <div class="customerdetails__content__subcontent">
                                <h6 class="customerdetails__content__title">${key.split('_').join(' ')}</h6>
                                <div class="customerdetails__content__subtitle"><p>${mapKey[key].split(',').join('</p><br><p>')}</p></div>
                            </div>  
                        `
                }
            })


            return reqTemp
        };

        function renderHeaders(data) {
            let temp = '';
            data.map(mapKey => {


                temp += `<div class="customerdetails__subhead" >
                    <h5 class="customerdetails__subtitle">${mapKey['title']}</h5>
                    </div> 
                    
                    ${requireMents(mapKey)}`;;
            });
            return temp;
        }



        return `

                <div class="customerdetails__header">
                    <h4 class="customerdetails__title">${title}</h4>
                    <i class="material-icons" onclick = "closeCustomerInformation(event)" id="closeCustomerdetails">close</i>
                </div>
    
     ${renderHeaders(data)}
    
    
           `;
    };

    CustomerDetailsInformation.classList.add('order-active');


    fetch('/assets/data/order.json').then(res => res.json()).then(data => {
        data = data[index];
        data = listing[id].sub_titles.map(info => data[info]);
        customerwrapper.innerHTML = CustomerInfo(listing[id].title, data);
    })

}






function closeCustomerInformation(event) {
    CustomerDetailsInformation.classList.remove('order-active');
}


function toggleDash(event){
    let LinksWrapper = document.getElementById("dashboard__links");
    let overlay = document.querySelector("#overlay");
    let dashToggleBtn = document.querySelector('#dashmenus');

    if (typeof event !== "undefined" && typeof event.target !== "undefined") {
        if (dashToggleBtn){
        if (dashToggleBtn.contains(event.target)) {
            LinksWrapper.classList.add('showdashmenu');
            overlay.style.display = 'block';
        }   else {
            overlay.style.display = 'none';
            LinksWrapper.classList.remove('showdashmenu');
        }
}
    }

    
}

function closeInfo(event){

   let closeinfobtn = event.target
       if(closeinfobtn){
    MoreInformation.classList.remove('order-active');
   }
       
}


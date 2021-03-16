
// navbar side menu function
mobilemenu = document.querySelector('#mobilemenu');

document.addEventListener('DOMContentLoaded',function(){

        window.addEventListener('click',e=>{

            adminMobileNav = document.querySelector('#menunavbar')

            if( typeof e !== "undefined" && typeof e.target !== "undefined"){

                if(mobilemenu.contains(e.target)){
                    adminMobileNav.classList.add('admin_active');
                } else if (adminMobileNav.contains(e.target)){
                    adminMobileNav.classList.add('admin_active');
                } 
                else{
                    adminMobileNav.classList.remove('admin_active');
                }

            }


        })

 
        
    
});





let createblog = document.getElementById('createblog');
let editor = document.getElementById('editor')
const output = document.getElementById('output'); 
const savedinfo = document.getElementById('savedinfo');
const HeaderElement = document.getElementById('customeditor');
const blogForm = document.querySelector("#blogform");


let titleinput = document.getElementById('titleinput');

// default header and content 
let timer,typingoutval = 1000; 





let blogdata = []
let properties = {};
// let titledata = {blogTitle:titleinput.value};

let draftdata = []
let draft= {};


document.addEventListener('DOMContentLoaded',function(){



        let titledata = {blogTitle: ''};

        titleinput.addEventListener('change',e=>{ 

                savedinfo.innerHTML = "Saving..."
                titledata = {blogTitle: titleinput.value};


                // titledata to be published 
                blogdata.titledata = [];
                blogdata.push(titledata);
                

                // draft titledata 
                draftdata.titledata= [];
                draftdata.push(titledata);

        
                draftdata.map(draftinfo =>{
                        sortdata(draftinfo,draft);
                        return draft; 
                });


                axios.post(path+'editorjs/draftBlog', draft)
                .then(res => {
                        savedinfo.innerHTML = "Saved"
                 })  
                 
                 
               
                
                
        });
       


        const editor = new EditorJS({

                data:{
                        time:1234567,
                        blocks:editorDraft.article,
                        version:"2.11.10"
                },

                holder:'editor',
                tools:{
                        code:CodeTool,
                        delimiter:Delimiter,
                        linkTool:{
                        class:LinkTool,
                        config:{
                                endpoint:window.location.protocol+'//'+window.location.host+'/editorjs/fetchUrl',
                        }
                        },
                        embed:{
                        class:Embed,
                        inlineToolbar: true,
                        config:{
                        services :{
                        youtube:true,
                        Vimeo:true,
                        Twitter :true,
                        Instagram :true,
                        }}
                        },
                        quote:{
                           class:Quote,
                           inlineToolbar:true,
                           shortcut: 'CMD+SHIFT+O',
                           config:{
                                quotePlaceholder:'Enter a quote',
                                captionPlaceholder:'Quote\'s author',
                           },    
                        },
                        Marker:{
                          class:Marker,
                          shortcut:'CMD+SHIFT+M',
                        },
                        list:{
                         class:List,
                         inlineToolbar:true,   
                        }, 
                        image: {
                                class: ImageTool,
                                config: {
                                  endpoints: {
                                    byFile: window.location.protocol+'//'+window.location.host+'/editorjs/blog/uploadFile', // Your backend file uploader endpoint
                                    byUrl: window.location.protocol+'//'+window.location.host+'/editorjs/blog/fetchUrl', // Your endpoint that provides uploading by Url
                                  }
                                },
                                uploader:{
                                        uploadByFile(file){
                                                // your own uploading logic here
                                                // return axios.post(file).then((data) => {
                                                //   return data
                                        
        
                                                return {
                                                        success: 1,
                                                        file: {
                                                          url: 'https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg',
                                                          // any other image data you want to store, such as width, height, color, extension, etc
                                                        }
                                                      };
                                }
                        }
                }
                },
                onChange: () => {


                        editor.save().then((outputData) => {

                                savedinfo.innerHTML = "Saving..."
                                
                                draftdata.outputData = [];
                                draftdata.push(outputData);

                                 // blog data
                                 blogdata.outputData = [];
                                 blogdata.push(outputData);
                                

                                
                                if (draftdata.outputData === []){
                                    draftdata.titledata = [];    
                                }else{
                                    draftdata.titledata = []  
                                    draftdata.unshift(titledata);  
                                }
                                

                                // sorting draft informations
                                draftdata.map(draftinfo =>{
                                      sortdata(draftinfo,draft);
                                      return draft; 
                                });

                                axios.post(path+'editorjs/draftBlog', draft)
                                .then(res => {
                                console.log(res.data);
                                savedinfo.innerHTML = "Saved"
                                })
                                
                               
                                
                              }).catch((error) => {
                                console.log('Saving failed: ', error)
                              });
                },

                placeholder: 'The world needs your words!',
                autofocus:false,

        })



        blogForm.addEventListener('submit',e=>{
                e.preventDefault();

                savedinfo.innerHTML = "Ready to Publish";
               


                if (editorDraft !== {} && blogdata === []){
                        properties = editorDraft; 

                }else{
                        blogdata.map(bloginfo => {   
                        sortdata(bloginfo,properties);
                        return properties; 
                        });
                }
                
                axios.post(path+'editorjs/createBlog', properties)
                .then(res => {
                        // console.log(res.data);
                        editor.blocks.clear();
                        blogForm.reset();  
                        if(res.data){
                                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){
                                        window.location.replace("http://localhost:5505/admin/blogs");
                                        
                                }
                        }
                })

                
                
        }); 

     

});

// function that sorts objects
function sortdata(singledata,property){
        if(singledata.blocks){
                property['article'] = singledata.blocks;
        }else if(singledata.blogTitle !== 'undefined'){
                property['Title'] = singledata.blogTitle;
        }

        return property;
}



function populateTitle(){
        

    if ( editorDraft.Title !== {}){
            let drafttitle = editorDraft.Title;
            titleinput.value = drafttitle;
    }

    console.log('working');   
}

populateTitle();







    

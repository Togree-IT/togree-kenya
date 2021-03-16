

let editor = document.getElementById('editor');
let editorform = document.getElementById('editorform');
let titleinput = document.getElementById('titleinput');
const savedinfo = document.getElementById('savedinfo');



// default header and content 
let timer,typingoutval = 1000; 


let blogdata = {};



document.addEventListener('DOMContentLoaded',function(){

                                    const editor = new EditorJS({

                                        data:{
                                                time: Date.now(),
                                                blocks:blogData.article,
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
                                        // onChange: () => {
                                        //         // editor.save().then(data=>{
                                        //         //         if('blocks' in data){
                                        //         //             blogdata['article'] =data.blocks;
                                        //         //             blogdata['Title'] = titleinput.value;
                                                               
                                                                
                                        //         //                 // axios.post(path+'editorjs/draftBlog', draft)
                                        //         //                 // .then(res => {
                                        //         //                 //         savedinfo.innerHTML = "Saved"
                                        //         //                 // });
                                        //         //         }
                                        //         // }).catch((error) => {
                                        //         //         console.log('Saving failed: ', error)
                                        //         //     });
                                        // },

                                        placeholder: 'The world needs your words!',
                                        autofocus:false,

                                    });

            // titleinput.addEventListener('change',e=>{ 

            //     // savedinfo.innerHTML = "Saving..."
                
            //     // editor.save().then(data=>{
            //     //         if('blocks' in data){
            //     //             blogdata['article'] =data.blocks;
            //     //             blogdata['Title'] = titleinput.value;
                                
            //     //                 // axios.post(path+'editorjs/draftBlog', draft)
            //     //                 // .then(res => {
            //     //                 //         savedinfo.innerHTML = "Saved"
            //     //                 // });
            //     //         }
            //     // }).catch((error) => {
            //     //         console.log('Saving failed: ', error)
            //     //         });       
                
            // });


            editorform .addEventListener('submit',e=>{
                e.preventDefault();

                savedinfo.innerHTML = "Ready to Publish";
                
                editor.save().then(data=>{
                        if('blocks' in data){
                            
                                blogdata['Title'] = titleinput.value;
                                blogdata['article'] =data.blocks;
                                
                               

                                axios.post(path+'admin/editor/update', {key, article: blogdata}).then(res=>{
                                    console.log(res.data);
                                    if(res.data){

                                        window.location.replace("http://localhost:5505/admin/blogs");
                                             
                                    }
                                    
                                });
                                // axios.post(path+'editorjs/createBlog', blogdata)
                                // .then(res => {
                                //         editor.blocks.clear();
                                //         blogForm.reset();
                                //         if(res.data){
                                                
                                //         }
                                // })
                        }
                });

                
                // console.log(properties)
        });



        


 
});





function populateTitle(){
        
    if ( blogData.Title !== {}){
            let drafttitle = blogData.Title;
            titleinput.value = drafttitle;
    }

    console.log('working');   
}

populateTitle();
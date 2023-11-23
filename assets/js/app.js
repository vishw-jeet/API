const cl=console.log;

const postContainer=document.getElementById("postcards");
const formContainer=document.getElementById("form");
const titleContainer=document.getElementById("title");
const bodyContainer=document.getElementById("body");
const userIdContainer=document.getElementById("userId");
const UpdateBtn=document.getElementById("UpdateBtn");
const AddBtn=document.getElementById("AddBtn");

let baseUrl='https://jsonplaceholder.typicode.com';
let postUrl=`${baseUrl}/posts`;

let postArry=[];

const creatPost=(ele)=>{
    let xhr= new XMLHttpRequest();
    xhr.open("post",postUrl,true);

    xhr.send(JSON.stringify(ele))
    xhr.onload= function(){
        if( xhr.status===200 || xhr.status===201){
            ele.id=JSON.parse(xhr.response).id
            postArry.push(ele);
            templeting(postArry) 
            formContainer.reset();
        }
    }
}

const onEditBtn=(eve)=>{
    let getEditId=eve.closest(".card").id
    // cl(getEditId)
    let getEditedObjUrl=`${baseUrl}/posts/${getEditId}`
    // cl(getEditedObj)

    let xhr=new XMLHttpRequest(); //creat instant /obj

    xhr.open("GET",getEditedObjUrl,true); // it req to backend with  1 method name  2 url path diclaration 3 beheviar handal asinq
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status===200 ){
            let getEditedObj=JSON.parse(xhr.response)
            titleContainer.value=getEditedObj.title,
            bodyContainer.value=getEditedObj.body,
            userIdContainer.value=getEditedObj.userId

            AddBtn.classList.add("d-none");
            UpdateBtn.classList.remove("d-none");
         
        }else{

        }
    }
}
let templeting=(ele)=>{
    let result="";
    ele.forEach(post => {
        result+=` <div class="card mb-4" id="${post.id}">
                    <div class="card-header">
                        <h2>${post.title}</h2>
                    </div>
                    <div class="card-body">
                        <p>${post.body} </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-outline-primary" onclick="onEditBtn(this)">Edit</button>
                        <button class="btn btn-outline-danger">Delete</button>
                    </div>
                    </div>`
    });
    postContainer.innerHTML=result;
}

const onsubmitHandler=(eve)=>{
    eve.preventDefault();
    let newPost={
        title:titleContainer.value,
        body:bodyContainer.value,
        userId:userIdContainer.value
    }
    // cl(newPost)
    creatPost(newPost);
}



const getAllPosts=()=>{
    //1--->> creat a object / instance XMLHttpRequest
    let xhr= new XMLHttpRequest();

    //2---> configraion
xhr.open("GET",postUrl,true);
xhr.send();
xhr.onload=function(){
    if(xhr.status===200){
        // cl(xhr.response)
        postArry=JSON.parse(xhr.response);
        // cl(postData)
        templeting(postArry);
    }else{
        alert('something went wrong')
    }
    // templeting()
    // cl(xhr.status)   200
    // cl(xhr.staus.Text)  200
}
}
getAllPosts();
formContainer.addEventListener("submit",onsubmitHandler);
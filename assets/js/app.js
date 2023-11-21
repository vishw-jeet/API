const cl=console.log;

const postContainer=document.getElementById("postcards")
let baseUrl='https://jsonplaceholder.typicode.com';

let postUrl=`${baseUrl}/posts`;


let xhr= new XMLHttpRequest();

xhr.open("GET",postUrl,true);

xhr.send();

let templeting=(ele)=>{
    let result="";
    ele.forEach(post => {
        result+=`  <div class="col-md-6 offset-md-3">
                    <div class="card mb-2">
                    <div class="card-header">
                        <h2>${post.title}</h2>
                    </div>
                    <div class="card-body">
                        <p>${post.body} </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-outline-primary">Update</button>
                        <button class="btn btn-outline-danger">Delete</button>
                    </div>
                    </div>
                </div>`
    });
    postContainer.innerHTML=result;
}


xhr.onload=function(){
    if(xhr.status===200){
        // cl(xhr.response)
        let postData=JSON.parse(xhr.response);
        // cl(postData)
        templeting(postData);
    }else{
        alert('something went wrong')
    }
}


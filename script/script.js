let btn1 = true;
let btn2 = true;
let searchRes = false;

async function getPosts() {
  try {


    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    let posts = document.getElementById("posts");
    data.forEach(element => {
      createPost(element);
    }); 


    document.getElementById("btn1").addEventListener("click", function(){
      if(btn1){
        data.sort(function(a, b) {
          return b.userId - a.userId;
        });
        btn1 = false;
      }
      else{
        data.sort(function(a, b) {
          return a.userId - b.userId;
        });
        btn1 = true;
      }
      let value1 = document.getElementById("search").value;
      if (value1.length == 0) {
        posts.innerHTML='';
        data.forEach(element => {
          createPost(element);
        }); 
      }
      else if(value1.length >= 3){
        posts.innerHTML='';
        data.forEach(element => {
          searchFunc(document.getElementById("searchType").value, value1, element);
        });
      }
    });


    document.getElementById("btn2").addEventListener("click", function(){
      if(btn2){
        data.sort(function(a, b) {
          return b.id - a.id;
        });
        btn2 = false;
      }
      else{
        data.sort(function(a, b) {
          return a.id - b.id;
        });
        btn2 = true;
      }
      let value1 = document.getElementById("search").value;
      if (value1.length == 0) {
        posts.innerHTML='';
        data.forEach(element => {
          createPost(element);
        }); 
      }
      else if(value1.length >= 3){
        posts.innerHTML='';
        data.forEach(element => {
          searchFunc(document.getElementById("searchType").value, value1, element);
        });
      }
    });

    document.getElementById("searchType").addEventListener("change", function(){
      let value1 = document.getElementById("search").value;
      if (value1.length >= 3) {
        posts.innerHTML='';
        data.forEach(element => {
          searchFunc(this.value, value1, element);
        });
        if (!searchRes) {
          let p = document.createElement("p");
          p.className = 'failure';
          p.innerHTML = "По запросу ничего не найдено";
          posts.appendChild(p);
        }
      }
    });

    document.getElementById("search").addEventListener("input", function(){
      searchRes = false;
      if(this.value.length >= 3){
        posts.innerHTML='';
        let type = document.getElementById("searchType");
        data.forEach(element => {
          searchFunc(type.value, this.value, element);
        });
        if (!searchRes) {
          let p = document.createElement("p");
          p.className = 'failure';
          p.innerHTML = "По запросу ничего не найдено";
          posts.appendChild(p);
        }
      }
      else if(this.value.length == 0){
        posts.innerHTML='';
        data.forEach(element => {
          if(element.title.includes(this.value)){
            createPost(element);
          }
        });
      }
    });

  } catch(error) {

    alert(error);

  }
}
function searchFunc(type, search, element){
  switch(type){
    case '1':

    if(element.title.includes(search)){
      searchRes = true;
      createPost(element);
    }
    break;
    case '2':
    if(element.body.includes(search)){
      searchRes = true;
      createPost(element);
    }
    break;
    case '0':
    if(element.title.includes(search)||element.body.includes(search)){
      searchRes = true;
      createPost(element);
    }
    break;
  }
}

function createPost(element){
  let div = document.createElement("div");
  let id = document.createElement("p");
  let body = document.createElement("p");
  let title = document.createElement("h1");
  let user = document.createElement("p");

  id.className = 'postId';
  body.className = 'text';
  title.className = 'postTitle';
  user.className = 'userId';

  user.innerHTML = "id пользователя: " + element.userId;
  title.innerHTML = element.title;
  id.innerHTML = "id сообщения: " + element.id;
  body.innerHTML = element.body;

  div.appendChild(title);
  div.appendChild(body);
  div.appendChild(id);
  div.appendChild(user);

  posts.appendChild(div);
}

getPosts();

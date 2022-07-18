let imageFormShow = false;
let nameFormShow = false;
//cookies for user
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = () => {
    const id_e = document.querySelector(".id");
    const nume = document.querySelector(".name");
    const email_e = document.querySelector(".email");
    const easy_e = document.querySelector(".easy");
    const medium_e = document.querySelector(".medium");
    const hard_e = document.querySelector(".hard");
    const veryhard_e = document.querySelector(".veryhard");
    const insane_e = document.querySelector(".insane");
    const inhuman_e = document.querySelector(".inhuman");
    const picture_e = document.querySelector("#picture");
    let id_c = getCookie('id');
    let name = getCookie('name');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');
    let email_c = getCookie('email');
    email_c = email_c.replace("%40","@");
    let easy_c = getCookie('easy');
    let medium_c = getCookie('medium');
    let hard_c = getCookie('hard');
    let veryharc_c = getCookie('veryhard');
    let insane_c = getCookie('insane');
    let inhuman_c = getCookie('inhuman');
    let picture_c = getCookie('profil-image');
    if(picture_c ==='icon')
    {
        let icon =  document.createElement('span');
        icon.setAttribute('class','material-symbols-outlined');
        icon.setAttribute('id','picture-icon');
        icon.textContent = "account_circle";
        
        picture_e.appendChild(icon);

    }
    else
    {
        let img = document.createElement('img');
        img.src=`${picture_c}`;
        picture_e.appendChild(img);
        img.style.width = "100px";
        img.style.borderRadius = "100%";
        let buton = document.querySelector('#showform');
        buton.innerHTML= "Schimba poza";

    }
    id_e.textContent = `${id_c}.`
    nume.textContent = `${name}.`;
    email_e.textContent = `${email_c}.`;
    easy_e.textContent = `${easy_c}.`;
    medium_e.textContent = `${medium_c}.`;
    hard_e.textContent = `${hard_c}.`;
    veryhard_e.textContent = `${veryharc_c}.`;
    insane_e.textContent = `${insane_c}.`;
    inhuman_e.textContent = `${inhuman_c}.`;

};


function showAddImageForm(){
    if(imageFormShow === false)
    {
        imageFormShow = true;
        document.querySelector('.upload-image').classList.add('active');
    }
        
    else
    {
        imageFormShow = false;
        document.querySelector('.upload-image').classList.remove('active');
    }
        
    
}
function uploadImage()
{
    let id = getCookie('id');
    let action_src = `http://localhost:3001/api/addImage/${id}`;
    const form = document.querySelector('.upload-image');
    form.action = action_src;
    form.method = "post";
    
}
function showChangeNameForm()
{
    if(nameFormShow === false)
    {
        nameFormShow = true;
        document.querySelector(".changename").classList.add('active');
    }
    else
    {
        nameFormShow = false;
        document.querySelector(".changename").classList.remove('active');

    }
}
function updateName(){
    let id = getCookie('id');
    let action_src = `http://localhost:3001/api/updatename/${id}`;
    const form = document.querySelector('.formChangeName');
    form.action = action_src;
    form.method = "post";
}
function removeImage(){
    let image = getCookie('profil-image');
    if(image === 'icon')
    {
        alert("Nu poti STEREGE IMAGINEA deoarece NU AI INTRODUS UNA! Pentru a introduce o imagine, apasa butonul: ADD IMAGE.")
    }
    else
    {
        let id = getCookie('id');
        const form = document.querySelector('.removeImage');
        let action_src = `http://localhost:3001/api/removeImage/${id}`;
        form.action = action_src;
        form.method = "post";

    }
}
const sendFriendRequest = () =>{
    const form = document.querySelector('.formSend');
    let id = getCookie('id');
    let action_src =  `http://localhost:3001/api/send/${id}`;
    form.action = action_src;
    form.method = "post";
}

const receiveFriendRequest = () =>{
    const form = document.querySelector('.formReceive');
    let id = getCookie('id');
    let action_src =  `http://localhost:3001/api/receive/${id}`;
    form.action = action_src;
    form.method = "post";
}

const friends = () =>{
    const form = document.querySelector('.formFriends');
    let id = getCookie('id');
    let action_src = `http://localhost:3001/api/friends/${id}`;
    form.action = action_src;
    form.method = "post";
}
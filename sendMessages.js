function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const redirectMain = () =>{
    window.location.href = "game.html";
}
window.onload = () =>{
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
    let sendmessages = getCookie('sendmessages');
    if(sendmessages == 'nomessages')
    {
        const messages = document.querySelector('.messages');

        let result_box = document.createElement('div');
        result_box.setAttribute('class','result-box');
        result_box.textContent = "Nu ai trimis niciun mesaj.";
        messages.appendChild(result_box);
    }
    else
    {
        let len = getCookie('results-length');
        for(let i= len-1; i>=0 ;i--)
        {
            let id= getCookie( `${i}_send_id`);
            let profilimage= getCookie( `${i}_send_profilimage`);
            let name= getCookie( `${i}_send_name`);
            name = decodeURI(name);
            let subiect= getCookie( `${i}_send_subiect`);
            subiect = decodeURI(subiect);
            subiect = decodeURIComponent(subiect);
            
            let messages = document.querySelector('.messages');

            let result= document.createElement('form');
            result.setAttribute('class','result');
            result.setAttribute('id',`${i}`);
            messages.appendChild(result);
            result.style.cursor = "pointer";
            result.onmouseover = () =>{
                result.style.backgroundColor = "rgb(170, 124, 212)";
                result.style.color = "white";
            }
            result.onmouseleave = () =>{
                result.style.backgroundColor = "white";
                result.style.color = "black";
            }
            result.addEventListener('click',()=>{
                result.submit();
            })
            result.onsubmit = showMesage(result.id);

            

            let id_e = document.createElement('div');
            id_e.setAttribute('class','res');
            id_e.setAttribute('id','id');
            id_e.textContent = id;
            result.appendChild(id_e);

            let profil_picture = document.createElement('div');
            profil_picture.setAttribute('class','res');
            profil_picture.setAttribute('id','profilimage');
            result.appendChild(profil_picture);

            if(profilimage ==='icon')
            {
                let icon =  document.createElement('span');
                icon.setAttribute('class','material-symbols-outlined');
                icon.setAttribute('id','picture-icon');
                icon.textContent = "account_circle";
                
                profil_picture.appendChild(icon);
            }
            else
            {
                let profil_picture_image = document.createElement('img');
                profil_picture_image.setAttribute('id','picture');
                profil_picture_image.setAttribute('class','res');
                profil_picture_image.src = profilimage;
                profil_picture.appendChild(profil_picture_image);
            }

            let name_e = document.createElement('div');
            name_e.setAttribute('class','res');
            name_e.setAttribute('id','name');
            name_e.textContent = name;
            result.appendChild(name_e);

            let subiect_e = document.createElement('div');
            subiect_e.setAttribute('class','res');
            subiect_e.setAttribute('id','subiect');
            subiect_e.textContent = subiect;
            result.appendChild(subiect_e);

        }
    }
}
const showMesage = (ID) =>{
    const form  = document.getElementById(`${ID}`);
    let friendid= getCookie( `${ID}_send_id`);
    let id = getCookie('id');
    let messageid = getCookie(`${ID}_send_messageid`);
    
    let action_src = `http://localhost:3001/api/view/send/message/${ID}/${friendid}/${messageid}/${id}`;
    form.action = action_src;
    form.method = "post";
}
const receivedFunct = () =>{
    const form = document.querySelector("#send");
    let id= getCookie('id');
    let action_src = `http://localhost:3001/api/received/messages/${id}`;
    form.action = action_src;
    form.method = "post";
}

const redirectMail = () =>{
    window.location.href = "mail.html";
}
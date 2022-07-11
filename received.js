function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const redirectMain = () =>{
    const form = document.querySelector('.redirectMain');
    let res= getCookie('results-lenght');
    let action_src = `http://localhost:3001/api/delete/received/cookies/${res}`;
    form.action = action_src;
    form.method = "post";
};

window.onload = () =>{
    let len = getCookie("results-lenght");
    for(let i=0; i<len; i++)
    {
        let id =getCookie(`${i}_id`);
        let profil_image =getCookie(`${i}_profilimage`);
        let name =getCookie(`${i}_name`);
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
        name = name.replace("%20",' ');

        let result = document.createElement('div');
        result.setAttribute('class','result');
        let container = document.querySelector('.container');
        container.appendChild(result);

        let id_e = document.createElement('div');
        id_e.setAttribute('class','res');
        id_e.setAttribute('id','id');
        id_e.textContent = id;
        result.appendChild(id_e);

        let profil_picture = document.createElement('div');
        profil_picture.setAttribute('class','res');
        profil_picture.setAttribute('id','profilimage');
        result.appendChild(profil_picture);

        if(profil_image ==='icon')
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
            profil_picture_image.src = profil_image;
            profil_picture.appendChild(profil_picture_image);
        }

        let name_e = document.createElement('div');
        name_e.setAttribute('class','res');
        name_e.setAttribute('id','name');
        name_e.textContent = name;
        result.appendChild(name_e);

        let formAddFriend = document.createElement('form');
        formAddFriend.setAttribute('class','formAddFriend');
        formAddFriend.setAttribute('id',`${i}_add`);
        result.appendChild(formAddFriend);
        formAddFriend.onsubmit = addFriend(formAddFriend.id,i);

        let buttonAddFriend = document.createElement('button');
        buttonAddFriend.setAttribute('class',`res btn purple`);
        buttonAddFriend.setAttribute('id','addFriend');
        buttonAddFriend.textContent = "Add Friend";
        buttonAddFriend.type= "submit";
        formAddFriend.appendChild(buttonAddFriend);

        let formRejectFriend = document.createElement('form');
        formRejectFriend.setAttribute('class','formAddFriend');
        formRejectFriend.setAttribute('id',`${i}_reject`);
        result.appendChild(formRejectFriend);
        formRejectFriend.onsubmit = rejectFriend(formRejectFriend.id,i);

        let buttonRejectFriend = document.createElement('button');
        buttonRejectFriend.setAttribute('class',`res btn purple`);
        buttonRejectFriend.setAttribute('id','addFriend');
        buttonRejectFriend.textContent = "Reject Friend";
        buttonRejectFriend.type= "submit";
        formRejectFriend.appendChild(buttonRejectFriend);
    }
}
const addFriend = (ID,I) =>{
    let form = document.getElementById(`${ID}`);
    
    //button.classList.remove('res','btn','purple','touched');
    let i = I;
    let len  = getCookie('results-lenght');
    let friendid = getCookie(`${i}_id`);
    const userId = getCookie('id');
    let action_src = `http://localhost:3001/api/acceptFriendRequest/${userId}/${friendid}/${i}/${len}`;
    form.action = action_src;
    form.method = "post";
    
    
}

const rejectFriend = (ID,I) =>{
    let form = document.getElementById(`${ID}`);
    let i = I;
    let len = getCookie('results-lenght');
    let friendid = getCookie(`${i}_id`);
    const userId = getCookie('id');
    let action_src = `http://localhost:3001/api/rejectFriendRequest/${userId}/${friendid}/${i}/${len}`;
    form.action = action_src;
    form.method = "post";
}
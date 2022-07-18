function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload =() =>{
    let lenght = getCookie('results-lenght');
    for(let i=0; i<lenght; i++)
    {
        let id_c = getCookie(`${i}_id`);
        let profil_picture_c = getCookie(`${i}_profil-picture`);
        let name_c = getCookie(`${i}_name`);
        name_c=name_c.replace("%20",' ');
        name_c=name_c.replace("%20",' ');
        name_c=name_c.replace("%20",' ');
        name_c=name_c.replace("%20",' ');
        name_c=name_c.replace("%20",' ');
        name_c=name_c.replace("%20",' ');
        name_c=name_c.replace("%20",' ');
        let status = getCookie(`${i}_status`);

        const results_box = document.querySelector('.results-box'); 

        let result = document.createElement('div');
        result.setAttribute('class','result');
        results_box.appendChild(result);

        let id = document.createElement('div');
        id.setAttribute('class','res');
        id.setAttribute('id','id');
        id.textContent = id_c;
        result.appendChild(id);

        let profil_picture = document.createElement('div');
        profil_picture.setAttribute('class','res');
        profil_picture.setAttribute('id','picture');
        result.appendChild(profil_picture);

        if(profil_picture_c ==='icon')
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
            profil_picture_image.setAttribute('id','picture-image');
            profil_picture_image.src = profil_picture_c;
            profil_picture.appendChild(profil_picture_image);
        }
        

        let name = document.createElement('div');
        name.setAttribute('class','res');
        name.setAttribute('id','name');
        name.textContent = name_c;
        result.appendChild(name);

        if( status == 'button')
        {
            let formAddFriend = document.createElement('form');
            formAddFriend.setAttribute('class','formAddFriend');
            formAddFriend.setAttribute('id',`${i}`);
            result.appendChild(formAddFriend);
            formAddFriend.onsubmit = addFriend(formAddFriend.id);

            let buttonAddFriend = document.createElement('button');
            buttonAddFriend.setAttribute('class',`res btn purple`);
            buttonAddFriend.setAttribute('id','addFriend');
            buttonAddFriend.textContent = "Add Friend";
            buttonAddFriend.type= "submit";
            formAddFriend.appendChild(buttonAddFriend);
        }
        else
        {
            let replaceAction = document.createElement('div')
            replaceAction.setAttribute('class','res');
            replaceAction.setAttribute('id','replace');
            replaceAction.textContent = "Nici o actiune disponibila";
            result.appendChild(replaceAction);
        }
        
        
    }

}
const redirectMain = () =>{
    const form = document.querySelector('.redirectMain');
    let res= getCookie('results-lenght');
    let action_src = `http://localhost:3001/api/delete/search/cookies/${res}`;
    form.action = action_src;
    form.method = "post";
}
const addFriend = (ID) =>{
    let form = document.getElementById(`${ID}`);
    
    //button.classList.remove('res','btn','purple','touched');
    let i = form.id;
    let friendid = getCookie(`${i}_id`);
    const userId = getCookie('id');
    let action_src = `http://localhost:3001/api/addFriend/${userId}/${friendid}/${i}`;
    form.action = action_src;
    form.method = "post";
}

const search = () =>{
    const form = document.querySelector('.search');
    const id = getCookie('id');
    let action_src = `http://localhost:3001/api/search/${id}`;
    form.action = action_src;
    form.method = "post";
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
window.onload = () =>{
    let len = getCookie('results-lenght');
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
        let status =getCookie(`${i}_status`);

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

        

        let form = document.createElement('form');
        form.setAttribute('class','form');
        form.setAttribute('id',`${i}`);
        result.appendChild(form);
        form.onsubmit = compare(form.id);
        //form.onsubmit = alert('Not working yet 😊');

        let button = document.createElement('button');
        button.setAttribute('class',`res btn purple`);
        button.setAttribute('id','addFriend');
        button.textContent = "Compara";
        button.type= "submit";
        form.appendChild(button);
    }
}
const redirectMain =()=>{
    const form = document.querySelector('.redirectMain');
    
    let res= getCookie('results-lenght');
    let action_src = `http://localhost:3001/api/delete/send/cookies/${res}`;
    form.action = action_src;
    form.method = "post";
}
const compare = (ID) =>{
    const form  = document.getElementById(`${ID}`);
    const friend = getCookie(`${ID}_id`);
    let action_src = `http://localhost:3001/api/compare/${friend}`;
    form.action = action_src;
    form.method = "post";
}
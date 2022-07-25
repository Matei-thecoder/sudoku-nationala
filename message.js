function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const redirectMain = () =>{
   window.history.go(-1);
}
window.onload = () =>{
    let friendid =getCookie('friendid');
    let friendname = getCookie('friendname')
    friendname = decodeURI(friendname);
    let friendprofilimage = getCookie('friendprofilimage');
    let friendsubiect = getCookie('friendsubiect');
    friendsubiect = decodeURI(friendsubiect);
    friendsubiect = decodeURIComponent(friendsubiect);
    let friendmessage = getCookie('friendmessage');
    friendmessage = decodeURI(friendmessage);
    friendmessage = decodeURIComponent(friendmessage);

    const id_e = document.querySelector('#id');
    const name_e  = document.querySelector('#name');
    const profilimage_e = document.querySelector('#profilimage');
    const subiect_e = document.querySelector('#subiect');
    const message_e = document.querySelector('#message');

    if(friendprofilimage ==='icon')
    {
        let icon =  document.createElement('span');
        icon.setAttribute('class','material-symbols-outlined');
        icon.setAttribute('id','picture-icon');
        icon.textContent = "account_circle";
                
        profilimage_e.appendChild(icon);
    }
    else
    {
        let profil_picture_image = document.createElement('img');
        profil_picture_image.setAttribute('id','picture');
        profil_picture_image.setAttribute('class','res');
        profil_picture_image.src = friendprofilimage;
        profilimage_e.appendChild(profil_picture_image);
    }
    id_e.textContent = friendid;
    name_e.textContent = friendname;
    subiect_e.textContent = friendsubiect;
    message_e.textContent = friendmessage;

}
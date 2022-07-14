function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = () =>{
    let uname = getCookie('name');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    uname = uname.replace('%20',' ');
    let uprofilimage = getCookie('profil-image');
    let ueasy = getCookie('easy');
    let umedium = getCookie('medium');
    let uhard = getCookie('hard');
    let uveryhard = getCookie('veryhard');
    let uinsane = getCookie('insane');
    let uinhuman = getCookie('inhuman');
    
    let fname = getCookie('friend_name');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    fname = fname.replace('%20',' ');
    let fprofilimage = getCookie('friend_profilimage');
    let feasy = getCookie('friend_easy');
    let fmedium = getCookie('friend_medium');
    let fhard = getCookie('friend_hard');
    let fveryhard = getCookie('friend_veryhard');
    let finsane = getCookie('friend_insane');
    let finhuman = getCookie('friend_inhuman');

    const u_profilimage = document.querySelector('.u_profilimage');
    const u_name = document.querySelector('.u_name');
    const u_easy = document.querySelector('.u_easy');
    const u_medium = document.querySelector('.u_medium');
    const u_hard = document.querySelector('.u_hard');
    const u_veryhard = document.querySelector('.u_veryhard');
    const u_insane = document.querySelector('.u_insane');
    const u_inhuman = document.querySelector('.u_inhuman');

    const c_profilimage = document.querySelector('.c_profilimage');
    const c_name = document.querySelector('.c_name');
    const c_easy = document.querySelector('.c_easy');
    const c_medium = document.querySelector('.c_medium');
    const c_hard = document.querySelector('.c_hard');
    const c_veryhard = document.querySelector('.c_veryhard');
    const c_insane = document.querySelector('.c_insane');
    const c_inhuman = document.querySelector('.c_inhuman');

    const f_profilimage = document.querySelector('.f_profilimage');
    const f_name = document.querySelector('.f_name');
    const f_easy = document.querySelector('.f_easy');
    const f_medium = document.querySelector('.f_medium');
    const f_hard = document.querySelector('.f_hard');
    const f_veryhard = document.querySelector('.f_veryhard');
    const f_insane = document.querySelector('.f_insane');
    const f_inhuman = document.querySelector('.f_inhuman');

    if(uprofilimage ==='icon')
    {
        let icon =  document.createElement('span');
        icon.setAttribute('class','material-symbols-outlined');
        icon.setAttribute('id','picture-icon');
        icon.textContent = "account_circle";
            
        u_profilimage.appendChild(icon);
    }
    else
    {
        let profil_picture_image = document.createElement('img');
        profil_picture_image.setAttribute('id','picture-image');
        profil_picture_image.src = uprofilimage;
        u_profilimage.appendChild(profil_picture_image);
    }
    u_name.textContent = uname;
    u_easy.textContent =ueasy;
    u_medium.textContent = umedium;
    u_hard.textContent = uhard;
    u_veryhard.textContent = uveryhard;
    u_insane.textContent = uinsane;
    u_inhuman.textContent = uinhuman;

    if(fprofilimage ==='icon')
    {
        let icon =  document.createElement('span');
        icon.setAttribute('class','material-symbols-outlined');
        icon.setAttribute('id','picture-icon');
        icon.textContent = "account_circle";
            
        f_profilimage.appendChild(icon);
    }
    else
    {
        let profil_picture_image = document.createElement('img');
        profil_picture_image.setAttribute('id','picture-image');
        profil_picture_image.src = fprofilimage;
        f_profilimage.appendChild(profil_picture_image);
    }
    f_name.textContent = fname;
    f_easy.textContent =feasy;
    f_medium.textContent = fmedium;
    f_hard.textContent = fhard;
    f_veryhard.textContent = fveryhard;
    f_insane.textContent = finsane;
    f_inhuman.textContent = finhuman;

    if(ueasy > feasy)
        c_easy.textContent = '>';
    else if (ueasy < feasy)
        c_easy.textContent = '<';
    else
        c_easy.textContent = '=';

    if(umedium > fmedium)
        c_medium.textContent = '>';
    else if (umedium < fmedium)
        c_medium.textContent = '<';
    else
        c_medium.textContent = '=';

    if(uhard > fhard)
        c_hard.textContent = '>';
    else if (uhard < fhard)
        c_hard.textContent = '<';
    else
        c_hard.textContent = '=';

    if(uveryhard > fveryhard)
        c_veryhard.textContent = '>';
    else if (uveryhard < fveryhard)
        c_veryhard.textContent = '<';
    else
        c_veryhard.textContent = '=';
    
    if(uinsane > finsane)
        c_insane.textContent = '>';
    else if (uinsane < finsane)
        c_insane.textContent = '<';
    else
        c_insane.textContent = '=';

    if(uinhuman > finhuman)
        c_inhuman.textContent = '>';
    else if (uinhuman < finhuman)
        c_inhuman.textContent = '<';
    else
        c_inhuman.textContent = '=';
}
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
    let id_c = getCookie('id');
    let name = getCookie('name');
    let email_c = getCookie('email');
    email_c = email_c.replace("%40","@");
    let easy_c = getCookie('easy');
    let medium_c = getCookie('medium');
    let hard_c = getCookie('hard');
    let veryharc_c = getCookie('veryhard');
    let insane_c = getCookie('insane');
    let inhuman_c = getCookie('inhuman');
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
document.querySelector("#logout").addEventListener(()=>{

});
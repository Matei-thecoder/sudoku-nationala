function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const redirectMain = () =>{
    const form = document.querySelector('.redirectMain');
    let id= getCookie('id');
    let action_src = `http://localhost:3001/api/send/messages/${id}`;
    form.action = action_src;
    form.method = "post";
 }

 const sendMail =() =>{
    const form = document.querySelector('#form');
    let id= getCookie('id');
    let action_src = `http://localhost:3001/api/send/mail/${id}`;
    form.action = action_src;
    form.method = "post";
 }
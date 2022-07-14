function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const changepassword = () =>{
    const form = document.querySelector('.form');
    let id = getCookie('id');
    let action_src = `http://localhost:3001/api/change/password/${id}`;
    form.action = action_src;
    form.method = "post";
}
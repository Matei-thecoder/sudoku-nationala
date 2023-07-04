document.querySelector("#btn-return-game-screen").addEventListener('click',()=>{
    window.location.href="../game.html";
})
const random=()=>{
    window.location.href="random.html";
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
/*const friend =()=>{
    window.location.href="friend.html";
}*/
const friends = () =>{
    const form = document.querySelector('.formFriends');
    let id = getCookie('id');
    let action_src = `http://localhost:3001/api/friends2/${id}`;
    form.action = action_src;
    form.method = "post";
}

//to do
//mke it save the progress
//initial value
let su_answer = undefined;
let su_question=undefined;
let su_original=undefined;
const url = window.location.origin;
let mistakes=0;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
let nume=getCookie('name');
nume = nume.replace("%20",' ');
nume = nume.replace("%20",' ');

nume=nume.replace("%20",' ');
nume=nume.replace("%20",' ');
let id = getCookie('id');
let mvr = getCookie('mvr');
let socket = io.connect(url,{query:`name=${nume}`});
//const socket =io();
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("random");
  });
socket.on("hi",()=>{
    console.log("hi");
})
let uname;
let oname;


socket.on("game.begin",(data)=>{
    console.log("game begin");
    su_answer=data.su_answer;
    su_question=data.su_question;
    su_original=data.su_original;
    uname = data.name;
    oname = data.opponentName;
    document.querySelector(".your").innerHTML ="Your opponent name "+`<b style="color:red;">${oname}</b>`;
    document.querySelector(".opponent").innerHTML = "Your name "+`<b>${uname}</b>`;
    document.querySelector(".mistakes").innerHTML = `${mistakes}/3`;
    wait.classList.remove('active');
    game_screen.classList.add('active');
    addButtonEvent();
    //initGameGrid();
    //countUpTimer();
    clearSudoku();
    startGame();
    //showTime()
    //let pause = false;
    //pausef();
    initSudoku();
    
    //removeErr();
    //loadSudoku();
    
    //showResult();
    init1(su_answer);
    socket.on("player disconnected",()=>{
        window.location.href="../game.html";
        console.log("get out");
    });
    
});
socket.on("player disconnected",()=>{
    window.location.href="../game.html";
    console.log("get out");
});
socket.on("won",()=>{
    showResult(1);
    
});
socket.on("lost",()=>{
    showResult(2);
    
})


//console.table(su_answer);
const start_screen = document.querySelector('#start-screen');
const instruction_screen = document.querySelector('#instruction-screen');
const cells = document.querySelectorAll('.main-grid-cell');
const game_screen = document.querySelector('#game-screen');
const pause_screen = document.querySelector('#pause-screen');
const game_time = document.querySelector('#game-time');
const number_inputs = document.querySelectorAll('.number');
const result_screen = document.querySelector('#result-screen');
const result_time = document.querySelector('#result-time')
const body = document.querySelector('.body');
const profil = document.querySelector('.profil');
const search = document.querySelector('.search');
const header = document.querySelector('.header');
const message = document.querySelector('.message');
const wait = document.querySelector('.wait-screen');
console.log("ceva");
let timer=null;
let pause = false;
var timerVariable;// = setInterval(countUpTimer, 1000);
var seconds = 0;

let savedGameInfo = false;
let selected_cell = -1;
const getGameInfo = () => JSON.parse(localStorage.getItem('game'));

let level_index = 0;
let level = CONSTANT.LEVEL[level_index];
let leveldb = CONSTANT.LEVELNAMEDB[level_index];

//end initial value;
//add space for each 9 cells;
const addButtonEvent = () => {
    document.querySelector('#btn-return-game-screen').addEventListener('click',()=>{
        removeGameInfo();
        socket.emit("lost",{
            name:nume,
        });
    })
}
const initGameGrid = ()=>{
    let index=0;
    for(let i=0; i<Math.pow(CONSTANT.GRID_SIZE,2);i++)
    {
        let row = Math.floor(i/CONSTANT.GRID_SIZE);
        let col = i%CONSTANT.GRID_SIZE;
        if(row ===2  || row === 5) cells[index].style.marginBottom = "10px";
        if(col ===2 || col ===5 ) cells[index].style.marginRight = "10px";
        index++;
    }
}
function countUpTimer(){
    console.log("timer");
  seconds++;
  var hour = Math.floor(seconds / 3600);
  var minute = Math.floor((seconds - hour * 3600) / 60);
  var tseconds = seconds - (hour * 3600 + minute * 60);
  document.getElementById("game-time").innerHTML = hour + ":" + minute + ":" + tseconds;
}
const showTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);
/*function pausef()
{
    if(!pause)
    {
        pause=true;
        clearInterval(timerVariable);
        let pause_button=document.getElementById('p-b');
        pause_button.innerHTML='l>'
    }
    else
    {
        pause=false;
        //timerVariable = setInterval(countUpTimer, 1000);
        let pause_button=document.getElementById('p-b');
        pause_button.innerHTML='II';
    }
}*/
// end add space for each 9 cells;
const returnStartScreen = () =>{
    clearInterval(timerVariable);
    let pause_button=document.getElementById('p-b');
    pause_button.innerHTML='II';
    pause = false;
    seconds = 0;
    //window.location.href = "index.html";
    game_screen.classList.remove('active');
    start_screen.classList.add('active');
    search.classList.add('active');
    profil.classList.add('active');
    body.classList.add('active');
    message.classList.add('active');
    
}
const clearSudoku = () =>{
    for(let i =0;i<Math.pow(CONSTANT.GRID_SIZE,2); i++)
    {
        cells[i].innerHTML =" ";
        cells[i].classList.remove('filled');
        cells[i].classList.remove('selected');
    }
}
const initSudoku = ()=>{
    //clear old sudoku

    clearSudoku();
    resetBg();

    //generate sudoku here
    //su_answer=[...su_question];
    
    console.table(su_answer);
    //addButtonEvent();
    //saveGameInfo();
    //show sudoku to div
    for(let i =0;i<Math.pow(CONSTANT.GRID_SIZE,2); i++)
    {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;
        cells[i].setAttribute('data-value', su_question[row][col]);

        if(su_question[row][col] !== 0)
        {
            cells[i].classList.add('filled');
            cells[i].innerHTML = su_question[row][col];
        }

    }
    

}

const hoverBg = (index) =>{
    let row = Math.floor(index/CONSTANT.GRID_SIZE);
    let col = index % CONSTANT.GRID_SIZE;

    let box_start_row = row - row%3;
    let box_start_col = col - col%3;

    for (let i = 0;i<CONSTANT.BOX_SIZE; i++)
    {
        for(let j=0; j<CONSTANT.BOX_SIZE;j++)
        {
            let cell = cells[9 * (box_start_row +i) + (box_start_col +j)];
            cell.classList.add('hover');
        }
    }
     let step =9;
     while(index - step >=0)
    {
        cells[index -step].classList.add('hover');
        step +=9;
    }
    step =9;
    while(index + step<81)
    {
        cells[index +step].classList.add('hover');
        step +=9;
    }
    step = 1;
    while (index - step >= 9*row) {
        cells[index - step].classList.add('hover');
        step += 1;
    }

    step = 1;
     while (index + step < 9*row + 9) {
        cells[index + step].classList.add('hover');
        step += 1;
    }
    

}
const resetBg = () =>{
    cells.forEach(e => e.classList.remove('hover'));
}
const checkErr = (value) => {
    let ok=false;
    const addErr = (cell) => {
        if (parseInt(cell.getAttribute('data-value')) === value) {
            cell.classList.add('err');
            cell.classList.add('cell-err');
            ok=true;
            cells[selected_cell].setAttribute('data-value',0);
            let row = Math.floor(selected_cell/CONSTANT.GRID_SIZE);
            let col = selected_cell % CONSTANT.GRID_SIZE;
            su_answer[row][col] = 0;
            setTimeout(() => {
                cell.classList.remove('cell-err');
                cell.classList.remove('err');
            }, 1000);
        }
    }

    let index = selected_cell;

    let row = Math.floor(index / CONSTANT.GRID_SIZE);
    let col = index % CONSTANT.GRID_SIZE;

    let box_start_row = row - row % 3;
    let box_start_col = col - col % 3;

    for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
        for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
            let cell = cells[9 * (box_start_row + i) + (box_start_col + j)];
            if (!cell.classList.contains('selected')) addErr(cell);

        }
    }

    let step = 9;
    while (index - step >= 0) {
        addErr(cells[index - step]);
        step += 9;
    }

    step = 9;
    while (index + step < 81) {
        addErr(cells[index + step]);
        step += 9;
    }

    step = 1;
    while (index - step >= 9*row) {
        addErr(cells[index - step]);
        step += 1;
    }

    step = 1;
    while (index + step < 9*row + 9) {
        addErr(cells[index + step]);
        step += 1;
    }
    if(ok)
    {
        mistakes++;
        document.querySelector(".mistakes").innerHTML = `${mistakes}/3`;
        setTimeout(() => {
            cells[selected_cell].innerHTML = "";
        }, 0);  
    }
    
}


const removeErr = () => cells.forEach(e => e.classList.remove('err'));


const saveGameInfo = () =>{
    let game  ={
        level:level_index,
        seconds:seconds,
        su:{
            original: su_original,
            question: su_question,
            answer: su_answer
        }
        

    }
    localStorage.setItem('game',JSON.stringify(game));
    savedGameInfo=true;
}

const removeGameInfo = () =>{

    localStorage.removeItem('game');
    //document.querySelector('#btn-continue').style.display = 'none';

}
const loadSudoku = () => {
    let game = getGameInfo();

    //game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index];

    su = game.su;

    su_answer = su.answer;

    seconds = game.seconds;
    //game_time.innerHTML = showTime(seconds);

    level_index = game.level;

    // show sudoku to div
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;
        
        cells[i].setAttribute('data-value', su_answer[row][col]);
        cells[i].innerHTML = su_answer[row][col] !== 0 ? su_answer[row][col] : '';
        if (su_question[row][col] !== 0) {
            cells[i].classList.add('filled');
        }
    }
}
const isGameWin1 = (grid) =>sudokuCheck(grid);

const showResult = (nr) =>{
    clearInterval(timer);

    
    if(nr===1)
    {
        game_screen.classList.remove('active');
        result_screen.classList.add('active');
        header.classList.add('normal');
        document.querySelector(".congrate").innerHTML = "Felicitari, ai castigat";
        document.querySelector("#opponent").innerHTML = oname;
        const form = document.querySelector('#finish');
        mvr++;
        let action_src = `http://localhost:3001/api/modifyMultiplayer/${id}/${mvr}`;
        form.action = action_src;
        form.method = "post";
    }
    else
    {
        game_screen.classList.remove('active');
        wait.classList.add('active');
        /*document.querySelector(".congrate").innerHTML = "Ai pierdut";
        document.querySelector("#opponent").innerHTML = oname;
        const button = document.querySelector("#btn-new-game-2");
        button.addEventListener('click',()=>{
            window.location.href = "../game.html";
        })*/
    }
    result_time.innerHTML = showTime(seconds);
    //const resultLevelName = document.querySelector("#levelname");
    ///resultLevelName.textContent = `${ CONSTANT.LEVEL_NAME[level_index]}`;
    

}

const initNumberInputEvent1 = (grid)=>{
    number_inputs.forEach((e, index) =>{
        e.addEventListener('click', ()=>{
            if(!cells[selected_cell].classList.contains('filled')){
                cells[selected_cell].innerHTML = index + 1;
                cells[selected_cell].setAttribute('data-value' , index +1);
                //add to answer

                let row = Math.floor(selected_cell / CONSTANT.GRID_SIZE)
                let col = selected_cell % CONSTANT.GRID_SIZE;
                su_answer[row][col] = index +1;
                //save game
                saveGameInfo();
                removeErr();
                checkErr(index + 1);
                
                cells[selected_cell].classList.add('zoom-in');
                setTimeout(() =>{
                    cells[selected_cell].classList.remove('zoom-in');
                },500);

                //check game win
                if(isGameWin1(grid)){
                    removeGameInfo();
                    
                    socket.emit("won",{
                        name:nume,
                        
                    })
                    //showResult();
                }
                if(mistakes==3)
                {
                    removeGameInfo();
                    socket.emit("lost",{
                        name:nume,
                    })
                }
                // ------

            }
        })
    })
}
//1h 44min
const initCellsEvent = () => {
    cells.forEach((e, index) => {
        e.addEventListener('click', () => {
            if (!e.classList.contains('filled')) {
                cells.forEach(e => e.classList.remove('selected'));

                selected_cell = index;
                e.classList.remove('err');
                e.classList.add('selected');
                resetBg();
                hoverBg(index);
            }
        })
    })
}
//1h 40 min


/*document.querySelector('#btn-pause').addEventListener('click',()=>{
    pause_screen.classList.add('active');
    game_screen.classList.remove('active');
    document.querySelector('.header').classList.add('normal');
    pause =true;
})
document.querySelector('#btn-resume').addEventListener('click',()=>{
    pause_screen.classList.remove('active');
    game_screen.classList.add('active');
    document.querySelector('.header').classList.remove('normal');
    pause =false;
    //timerVariable = setInterval(countUpTimer,1000);
    let pause_button=document.getElementById('p-b');
    pause_button.innerHTML='II';


})*/
/*document.querySelector('#btn-continue').addEventListener('click', () => {
    
        loadSudoku();
        startGame();
        if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
    if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
    start_screen.classList.remove('active');
    profil.classList.remove('active');
    message.classList.remove('active');
    search.classList.remove('active');
    body.classList.remove('active');
    game_screen.classList.add('active');
    document.querySelector('.header').classList.remove('normal');
    document.querySelector('.contacts').classList.remove('active');
    savedGameInfo = false;
    
});*/
/*document.querySelector('#btn-new-game').addEventListener('click',()=>{
    //clearInterval(timerVariable);
    if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
    if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
    document.querySelector('.header').classList.add('normal');
    document.querySelector('.contacts').classList.add('active');
    savedGameInfo=false;
    returnStartScreen();
})*/
/*document.querySelector('#btn-new-game-2').addEventListener('click',()=>{
    if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
        if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
    document.querySelector('.header').classList.add('normal');
    document.querySelector('.contacts').classList.add('active');
    returnStartScreen();
})*/
/*
document.querySelector('#btn-delete').addEventListener('click',()=>{
    cells[selected_cell].innerHTML ='';
    cells[selected_cell].setAttribute('data-value',0);
    let row = Math.floor(selected_cell/CONSTANT.GRID_SIZE);
    let col = selected_cell % CONSTANT.GRID_SIZE;
    su_answer[row][col] = 0;
    removeErr();
})*/
/*document.querySelector('.btn.new-game').addEventListener('click', ()=>{
    start_screen.classList.remove('active');
    profil.classList.remove('active');
    message.classList.remove('active');
    search.classList.remove('active');
    body.classList.remove('active');
    if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
    game_screen.classList.add('active');
    if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
    //removeGameInfo();
    document.querySelector('.header').classList.remove('normal');
    document.querySelector('.contacts').classList.remove('active');
    
    savedGameInfo=false;
    startGame();
})*/
/*document.querySelector('#instruction-show').addEventListener('click', ()=>{
    start_screen.classList.remove('active');
    profil.classList.remove('active');
    message.classList.remove('active');
    
    search.classList.remove('active');
    body.classList.remove('active');
    if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
    instruction_screen.classList.add('active');
    if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
     document.querySelector('.header').classList.remove('normal');
     profil.classList.remove('active');
     search.classList.remove('active');
    ///eroare apare in game screen meniul intrcutiou] de rezolvat
})*/
/*document.querySelector('#btn-go-back').addEventListener('click',()=>{
    start_screen.classList.add('active');
    profil.classList.add('active');
    message.classList.add('active');
    search.classList.add('active');
    body.classList.add('active');
    instruction_screen.classList.remove('active');
    if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
    if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
    document.querySelector('.header').classList.add('normal');
    document.querySelector('.contacts').classList.add('active');
})
document.querySelector('#btn-return-game-screen').addEventListener('click',()=>{
    if(instruction_screen.classList.contains('active'))
        instruction_screen.classList.remove('active');
    if(pause_screen.classList.contains('active'))
        pause_screen.classList.remove('active');
    if(result_screen.classList.contains('active'))
        result_screen.classList.remove('active');
    game_screen.classList.remove('active');
    start_screen.classList.add('active');
    profil.classList.add('active');
    message.classList.add('active');
    search.classList.add('active');
    body.classList.add('active');
    document.querySelector('#btn-continue').classList.remove('inactive');
    document.querySelector('.header').classList.add('normal');
    document.querySelector('.contacts').classList.add('active');
        saveGameInfo();
        savedGameInfo = true;
});
document.querySelector('#search-bar').addEventListener('click',()=>{
    window.location.href = "search.html";
})*/
//cookies for user
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

/*window.onload = () => {
    const element = document.querySelector(".salut");
    
    let name = getCookie('name');
    name = name.replace("%20",' ');
    name = name.replace("%20",' ');

    name=name.replace("%20",' ');
    name=name.replace("%20",' ');
    
    element.textContent = `Salut, ${name}!`;

    const resultLevelName = document.querySelector("#levelname");
    resultLevelName.textContent = `${ CONSTANT.LEVEL_NAME[level_index]}`;

    
    const profil_e = document.querySelector(".picture");
    const image = getCookie('profil-image');
    if(image === 'icon' )
    {
        let icon =  document.createElement('span');
        icon.setAttribute('class','material-symbols-outlined');
        icon.setAttribute('id','picture');
        icon.textContent = "account_circle";
        profil_e.appendChild(icon);  
    }
    else
    {
        let img = document.createElement('img');
        img.src=`${image}`;
        profil_e.appendChild(img);
        img.style.width = "60px";
        img.style.borderRadius = "100%";
    }
};*/
/*function updateDb(){
    const id= getCookie('id');
    let easy = getCookie('easy');
    if(leveldb == "easy") easy++;
    let medium = getCookie('medium');
    if(leveldb == "medium") medium++;
    let hard = getCookie('hard');
    if(leveldb == 'hard') hard++;
    let veryhard = getCookie('veryhard');
    if(leveldb == "veryhard") veryhard++;
    let insane = getCookie('insane');
    if(leveldb == "insane") insane++;
    let inhuman = getCookie('inhuman');
    if(leveldb == "inhuman") inhuman++;

    

    let action_src = `http://localhost:3001/api/update/${id}/${easy}/${medium}/${hard}/${veryhard}/${insane}/${inhuman}`;

    let form = document.getElementById("finish");
    form.action = action_src;
    form.method = "post";
    
};
const redirectMessages = () =>{
    const form = document.querySelector('.messageForm');
    let id =getCookie('id');
    let action_src = `http://localhost:3001/api/received/messages/${id}`;
    form.action = action_src;
    form.method = "post";
}
*/
const startGame =()=>{
    seconds = 0;
    
    /*if(savedGameInfo)
    {
        loadSudoku();
        //document.querySelector('#btn-continue').classList.remove('inactive');
    }
    else
    {*/
    timerVariable = setInterval(countUpTimer, 1000);
        //document.querySelector('#btn-continue').classList.add('inactive');
        initSudoku();
    //}
    
    
    initGameGrid();
    socket.on("player disconnected",()=>{
        clearInterval(timerVariable);
        window.location.href="../game.html";
        console.log("get out");
    })
    //countUpTimer()
}
const init1 = (grid)=>{
    
    /*if(savedGameInfo)
    {
        
        document.querySelector('#btn-continue').classList.remove('inactive');
    }*/
    initCellsEvent();
    initNumberInputEvent1(grid);

}
//init();


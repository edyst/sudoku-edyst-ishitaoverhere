const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];
var disableSelected = false;
var selectedNum;
var selectedCell;
var difficulty = easy[0];
var answer = [""];
window.onload = function () {
    startGame(); 
}
function changeDifficulty(n) {
    switch(n)
    {
        case 1 :  window.difficulty = easy[0];
        break;
        case 2 :  window.difficulty = medium[0];
        break;
        case 3 :  window.difficulty = hard[0];
        break;
        default: window.difficulty = easy[0];
    }
    startGame();
}
function updateMove() {
    if(selectedCell)
    {
        document.addEventListener('keydown', (event) => {
            var name = event.key;
            if(name>0 && name<10)
            {
            selectedCell.textContent = name;
            addToArray(name);
            } else if (name==0)
            {
            selectedCell.textContent = null;
            removeFromArray();
            }
          }, false);       
    }
}
function startGame() {
    let board;    
    // Start Game based on difficulty
    board = difficulty;    
    fillAns(difficulty);    
    //Create board  
    createBoard(board);
}
function id(id) {
    return document.getElementById(id);
}
function createBoard(board) {
    //clear previous board
    clearPrevious();
    //increment no. of cells
    let idCell = 0;
    //create 81 cells
    for(let i=0;i<81;i++){
        let cell  = document.createElement("p");
        if(board.charAt(i)!="-") {
            cell.textContent = board.charAt(i);
            cell.classList.add("prefilled");
        }   else {
            //add event listener to cell
            cell.addEventListener("click", function(){
                if(cell.classList.contains("selected")) {
                    cell.classList.remove("selected");
                    selectedCell = null;
                } else {
                    for(let i=0;i<81;i++) {
                        qA(".cell")[i].classList.remove("selected");
                    }                  
                }
                //add selection
                cell.classList.add("selected");
                selectedCell = cell;
                updateMove();
            }); 
        }
        //assign cell id
        cell.id = idCell;
        idCell++;
        //add cell class to all cells
        cell.classList.add("cell");
        //adding bottomBorder Class
        if((cell.id > 17 && cell.id < 27) || (cell.id > 44 && cell.id < 54 )) {
            cell.classList.add("bottomBorder");
        }
        //
        if( ((cell.id + 1) % 9 == 3) || ((cell.id + 1) % 9 == 6) ) {
            cell.classList.add("rightBorder");
        }
        //
        if((cell.id + 1) % 9 == 0 || (cell.id + 1) % 9 == 0) {
              cell.classList.add("rightBorder");
         }
         //
        if((cell.id + 2) % 9 == 2 || (cell.id + 2) % 9 == 2) {
            cell.classList.add("leftBorder");
       }
         //
        if((cell.id > 71 && cell.id < 81)) {
            cell.classList.add("bottomBorder");
        }
        //
        if((cell.id > -1 && cell.id < 9)) {
            cell.classList.add("topBorder");
        }
        //add cells to board
        id("board").appendChild(cell);
    }
}
function clearPrevious() {
    //select all Cells
    let cells = qA(".cell")
    for(let i=0;i<cells.length;i++)
    {
        cells[i].remove();
    }
}
function fillAns(str) {
    for(let i=0;i<str.length;i++) {
        answer[i] = str[i];
    }  
}
function addToArray(num) {
    let index = q(".selected").id;
    answer.splice(index,1,num);
    checks();
}
function removeFromArray() {
    let index = q(".selected").id;
    answer.splice(index,1,"-");
}
function validate() {
    let status= 1;
   for(let i=0;i<answer.length;i++)
   {
       let sum=0;
    
   for(let i=0;i<9;i++){
       if(answer!="-")
    sum+=parseInt(answer[i]);
       for(let j=i+9;j<81;j+=9){
        if(answer!="-")
           sum+=parseInt(answer[j]);
       }
   }
   if(sum!=405){
    status = 0;
   }  
   if(status!=0)
   {
        checks();
        for(let i=0;i<81;i++){
        if(id(i).classList.contains("incorrect")){
            status=0;
            break;
        }
    }
   }  
   //console.log(status); 
    }
    if(status==1){
        endGame();
        return;
       } else {
        alert("Something is not right, Try again.");
       }   
}
function endGame() {
    for(let i=0;i<81;i++){
        id(i).classList.add("prefilled");      
    }
    alert("You Win!, GGWP!");
}
function checks() {
    let col = parseInt(selectedCell.id % 9);
    let row = parseInt(selectedCell.id / 9);
    let s = selectedCell.id;
    //console.log(col,row);
    //VERTICAL CHECK
    for(let i=col;i<col+73;i+=9)
    {
        let ins = 1;
        for(let j=col;j<col+73;j+=9){
            if(i!=j && answer[i]==answer[j]){
                id(s).classList.add("incorrect");
                id(j).classList.add("incorrect");
                ins++;
            }
        }
        if(ins==1){
            for(let j=col;j<col+73;j+=9){
                if(answer[i]==answer[j]){
                    id(i).classList.remove("incorrect");
                    id(j).classList.remove("incorrect");
                }
            }
        }
    }
     //HORIZONTAL CHECK  
    for(let i=row*9;i<row*9+9;i++)
    {
        let ins = 1;
        for(let j=row*9;j<row*9+9;j++){
            if(i!=j && answer[i]==answer[j]){
                id(i).classList.add("incorrect");
                id(j).classList.add("incorrect");
                ins++;
            }
        }
        if(ins==1){
            for(let j=row*9;j<row*9+9;j++){
                if(answer[i]==answer[j]){
                    id(i).classList.remove("incorrect");
                    id(j).classList.remove("incorrect");
                }
            }
        }
    }
    //box1
    let x = 0;
    let y = 3;
    if( (-1<s && s<3) || (8<s && s<12) || (17<s && s<21) ) {    
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }
        }
    //box2
    x = 3;
    y = 6;
    if( (2<s && s<6) || (11<s && s<15) || (20<s && s<24) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }
    }
    //box3
    x = 6;
    y = 9;
    if( (5<s && s<9) || (14<s && s<18) || (23<s && s<27) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }       
    }
    //box4
    x=27;
    y=30;
    if( (26<s && s<30) || (35<s && s<39) || (44<s && s<48) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box5
    x = 30;
    y = 33;
    if( (29<s && s<33) || (38<s && s<42) || (47<s && s<51) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box6
    x = 33;
    y = 36;
    if( (32<s && s<36) || (41<s && s<45) || (50<s && s<54) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box7
    x = 54;
    y = 57;
    if( (53<s && s<57) || (62<s && s<66) || (71<s && s<75) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box8
    x = 57;
    y = 60;
    if( (56<s && s<60) || (65<s && s<69) || (74<s && s<78) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box9
    x = 60;
    y = 63;
    if( (59<s && s<63) || (68<s && s<72) || (77<s && s<81) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                id(j).classList.add("incorrect");
                                id(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    id(j).classList.remove("incorrect");
                                    id(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }   
    }
}
function q(selector) {
    return document.querySelector(selector);
}
function qA(selector) {
    return document.querySelectorAll(selector);
}
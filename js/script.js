// Source:
// https://bitbucket.org/james-schneider/drag-and-drop-api-matching-game/src/master/

const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');
const game = document.getElementById('game');

// current phrase being dragged
let selectedId;

// target phrase
let dropTargetId;

// counter for correct phrases
let matchingCounter = 0;

addEventListeners();

window.onload = Randomise();

document.getElementById("musicianlist").addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

function dragStart() {
  selectedId = this.id;
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(ev) {
  ev.preventDefault();
}

function dragDrop() {
  dropTargetId = this.id;

  if (checkForInstrument(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
  } else if (checkForMusician(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;
  }

  if (matchingCounter === 3) {
    game.style.display = 'none';
    endMessage.style.display = 'block';
  }

  this.classList.remove('over');
}


function checkForInstrument(selected, dropTarget) {
  switch (selected) {
    case 'musician1':
      return dropTarget === 'instrument1' ? true : false;

    case 'musician2':
      return dropTarget === 'instrument2' ? true : false;

    case 'musician3':
      return dropTarget === 'instrument3' ? true : false;

    default:
      return false;
  }
}

function checkForMusician(selected, dropTarget) {
  switch (selected) {
    case 'instrument1':
      return dropTarget === 'musician1' ? true : false;

    case 'instrument2':
      return dropTarget === 'musician2' ? true : false;

    case 'instrument3':
      return dropTarget === 'musician3' ? true : false;

    default:
      return false;
  }
}

function playAgain() {
  matchingCounter = 0;
  endMessage.style.display = 'none';
  draggableListItems.forEach(item => {
    Randomise();
    document.getElementById(item.id).style.display = 'block';
    game.style.display = 'grid';
  })
}

function addEventListeners() {
  draggableListItems.forEach (item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
  })
}

function Randomise(){
  var ul=document.getElementById("instrumentlist");
  for(var i=ul.children.length;i>=0;i--){
    ul.appendChild(ul.children[Math.random()*i|0])
  }
  
  var ul=document.getElementById("musicianlist");
  for(var i=ul.children.length;i>=0;i--){
    ul.appendChild(ul.children[Math.random()*i|0])
  }    
}

const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const priority = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


if(Notification.permission!=="granted"){
Notification.requestPermission();
}



function saveTasks(){

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);

}



function updateCounter(){

let completed=tasks.filter(

t=>t.completed

).length;


counter.innerHTML=`

Total : ${tasks.length}

| Completed : ${completed}

| Pending : ${tasks.length-completed}

`;

}



function renderTasks(){

taskList.innerHTML="";


tasks.sort((a,b)=>{

const order={

High:1,

Medium:2,

Low:3

};

return order[a.priority]-order[b.priority];

});



tasks.forEach((task,index)=>{


let li=document.createElement("li");


if(task.completed){

li.classList.add("completed");

}



li.innerHTML=`


<div class="task-info">


<strong>

${task.name}

</strong>



<small>

📅 ${task.date||"No Date"}

</small>



<small>

${task.priority}

</small>



</div>



<div class="task-buttons">


<button class="done">

✔

</button>



<button class="delete">

🗑

</button>



</div>

`;



li.querySelector(".done").onclick=function(){

tasks[index].completed=!tasks[index].completed;

saveTasks();

renderTasks();

};



li.querySelector(".delete").onclick=function(){

tasks.splice(index,1);

saveTasks();

renderTasks();

};



taskList.appendChild(li);

});



updateCounter();

}



function addTask(){


let name=taskInput.value.trim();


if(name===""){

alert("Enter Task");

return;

}



tasks.push({


name:name,

date:taskDate.value,

priority:priority.value,

completed:false


});



saveTasks();

renderTasks();



taskInput.value="";

taskDate.value="";



}



addBtn.onclick=addTask;



taskInput.addEventListener(

"keypress",

function(e){

if(e.key==="Enter"){

addTask();

}

}

);



renderTasks();
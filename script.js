let tasks=[]
let editingId=null

function loadData(){
    const saved=localStorage.getItem('codynnflowTasks')
    if(saved) tasks= JSON.parse(saved);
    else
        tasks=[
    {
        id:1,
        title:"Evaluate the addition and deletion of user IDs",
        status:"pending",
        priority:"minor",
        completed:false,
    },
     {
        id:2,
        title:"Identify the implementation team",
        status:"progress",
        priority:"normal",
        completed:false,
    },
     {
        id:3,
        title:"Batch schedule download/process",
        status:"pending",
        priority:"critical",
        completed:false,
    },
     {
        id:4,
        title:"Monitor system performance and adjust hardware",
        status:"pending",
        priority:"minor",
        completed:false,
    },
];
updateGreeting()
renderTasks()
}
function updateGreeting(){
    const hour= new Date().getHours();
    let greet="Good Morning"
    if(hour>=12 && hour<18)greet="Good Afternoon"
   else if(hour>=18)greet="Good Evening";
   document.getElementById("greeting").textContent=`${greet},Codynn`
}
function saveData(){
    localStorage.setItem("codynnflowTasks",JSON.stringify(tasks))
}

function renderTasks(){
    const onHold=tasks.filter((t)=>!t.completed)
    const completed=tasks.filter((t)=>t.completed)
    document.getElementById("onHoldTasks").innerHTML=onHold.length ? onHold.map((t)=>
   `
    <div class="task-item">
                    <div class="task-checkbox ${t.completed? "completed" : ""}" onclick="toggleTask(${t.id})"></div>
                    <div class="task-content">
                        <div class="task-title  ${t.completed? "completed":""}">${t.title}</div>
                    </div>
                    <span class="status-badge status-${t.status}">
                    ${
                        t.status ==="progress"? "In Progress" : t.status.charAt(0).toUpperCase()+t.status.slice(1)
                    }
                    </span>
                    <div class="priority-badge priority-${t.priority}">
                        <i class="fas fa-circle"></i> ${t.priority.charAt(0).toUpperCase()+t.priority.slice(1)}
                    </div>
                    <div class="avatar">CF</div>
                    <button class="icon-btn" style="width:30px;height:30px; " onclick="editTask(${t.id})">
                        <i class="fas fa-pen" style="font-size:12px;"></i>
                    </button>
                      <button class="icon-btn" style="width:30px;height:30px; " onclick="deleteTask(${t.id})">
                        <i class="fas fa-trash" style="font-size:12px;"></i>
                    </button>
                </div>
   ` ).join(""):'<p style="color:#9ca3af;padding:20px;">No task on hold</p>';
   document.getElementById("completedTasks").innerHTML=completed.length ? completed.map((t)=>`
   <div class="task-item">
                    <div class="task-checkbox completed " onclick="toggleTask(${t.id})"></div>
                    <div class="task-content">
                        <div class="task-title completed">${t.title}</div>
                    </div>
                    <span class="status-badge status-completed">
                   Completed
                    </span>
                    <div class="priority-badge priority-${t.priority}">
                        <i class="fas fa-circle"></i> ${t.priority.charAt(0).toUpperCase()+t.priority.slice(1)}
                    </div>
                    <div class="avatar">CF</div>
                    <button class="icon-btn" style="width:30px;height:30px; " onclick="editTask(${t.id})">
                        <i class="fas fa-pen" style="font-size:12px;"></i>
                    </button>
                      <button class="icon-btn" style="width:30px;height:30px; " onclick="deleteTask(${t.id})">
                        <i class="fas fa-trash" style="font-size:12px;"></i>
                    </button>
                </div>
   `).join(""):'<p style="color:#9ca3af;padding:20px;">No Completed Tasks</p>';

   const total=tasks.length
   const completedCount=tasks.filter((t)=>t.completed).length
   const pending=total-completedCount
   const rate=total ? Math.round((completedCount / total)*100) :0

   document.getElementById("taskCount").textContent=pending
   document.getElementById("totalTasks").textContent=total
   document.getElementById("completedCount").textContent=completedCount
   document.getElementById("pendingCount").textContent=pending
   document.getElementById("completionRateValue").textContent=rate + "%"
   document.getElementById("totalProgress").style.width=rate + "%"
   document.getElementById("completionProgress").style.width=rate + "%"
    saveData()
}

function toggleTask(id){
    const t=tasks.find((t)=>t.id ===id)
    if (t){
        t.completed=!t.completed;
        t.status=t.completed? "completed" : "pending"
        renderTasks()
    }
}
function deleteTask(id){
    if(confirm("Are you sure your want to delete this task?")){
        tasks=tasks.filter((t)=> t.id!== id);
        renderTasks();
    }
}
function openModal(){
    document.getElementById("taskModal").classList.add("active")
}
function closeModal(){
    document.getElementById("taskModal").classList.remove("active")
    document.getElementById("taskForm").reset()
    editingId=null;
}
document.getElementById("taskForm").addEventListener("submit",(e)=> {
    e.preventDefault()
    const title=document.getElementById("taskTitle").value
     const status=document.getElementById("taskStatus").value
      const priority=document.getElementById("taskPriority").value
   if(editingId){
    const t=tasks.find((t)=>t.id===editingId)
    t.title=title;
    t.status=status;
    t.priority=priority;
    t.completed=status==='completed'
   }else{
    tasks.push({
        id:Date.now(),
        title,
        status,
        priority,
        completed:status === "completed"
    })
   }
     renderTasks()
     closeModal() 
})
function editTask(id){
    editingId=id;
    const t=tasks.find((t) =>t.id===id)
    if(t){
        document.getElementById('taskTitle').value=t.title
        document.getElementById('taskStatus').value=t.status
        document.getElementById('taskPriority').value=t.priority
        openModal()
    }
}
loadData()
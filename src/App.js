import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer';
import About from './components/About';

function App() {

const [showAdd, setshowAdd] = useState(false)
const [tasks, settasks] = useState([])

useEffect(()=>{
  const getTasks = async ()=>{
    const tasksFromServer = await fetchTasks()
    settasks(tasksFromServer)
  }
  
  getTasks()
}, [])

const fetchTasks = async ()=>{
  const res = await fetch('http://localhost:4000/tasks')
  const data = await res.json()
  return data
}

const fetchTask = async (id)=>{
  const res = await fetch(`http://localhost:4000/tasks/${id}`)
  const data = await res.json()
  return data
}

const addTask = async (task)=>{
  const res = await fetch(`http://localhost:4000/tasks`, {
    method:'POST',
    headers : {'Content-type' : 'application/json'},
    body : JSON.stringify(task)
  })
  const data = await res.json()
  settasks([...tasks, data])
}

const deleteTask = async (id)=>{
  await fetch(`http://localhost:4000/tasks/${id}`, {method:'DELETE'})
  settasks(tasks.filter((task)=>task.id!==id))
}

const toggleReminder = async (id)=>{
  const taskToToggle = await fetchTask(id)
  const upTask = {...taskToToggle, reminder : !taskToToggle.reminder}

  const res = await fetch(`http://localhost:4000/tasks/${id}`,{
    method : "PUT",
    headers : {'Content-type' : 'application/json'},
    body : JSON.stringify(upTask)
  })
  const data = await res.json() 
  settasks(tasks.map((task)=>task.id===id ? {...task, reminder : data.reminder} : task))
}

  return (
    <Router>
      <div className = 'container'>
        <Header onAdd={()=>setshowAdd(!showAdd)} showAdd={showAdd}/>
        
        <Route path='/' exact render = {(props)=>(
          <>
          {showAdd&&<AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (<Tasks tasks={tasks} 
          onDelete={deleteTask}
          onToggle={toggleReminder} />) : 'No Tasks to show'} 
          </>
        )}/>
        <Route path='/about' component={About} />
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;

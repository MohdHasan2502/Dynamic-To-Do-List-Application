import React, { useState,useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
// import { allTodos, completedTodos } from "./data";


import "./App.css";

function App() {
  const [iscompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState ([]);
  const [newTitle, setNewTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [currentEdit,setCurrentEdit]=useState("");
  const [currentEditedItem,setCurrentEditedItem]=useState('');
  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription,
      // completed:false,
      // completedOn:null
    }
    let updatedTodoArr=[...allTodos]
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  }

   const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
   }

   const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth();
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=`${dd}-${mm}-${yyyy} ${h}:${m}:${s}`;

    let filteredItem={
      ...allTodos[index],
      // completed:true,
      completedOn:completedOn
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo (index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
   }

    const handleDeleteCompletedTodo=(index)=>{
    let reduceTodo=[...completedTodos];
    reduceTodo.splice(index);
    localStorage.setItem('completedTodos',JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
    }

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setAllTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[]);

  const handleEdit=(index,item)=>{
    console.log(index,item);
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }
   const handleUpdateTitle=(value)=>{
    setCurrentEditedItem((prev)=>{
      return{
        ...prev,
        title:value
      }})


   }
    const handleUpdateDescription=(value)=>{
    setCurrentEditedItem((prev)=>{
      return{
        ...prev,
        description:value
      }})
  
    }

    const handleUpdateToDo=()=>{
     let newTodo=[...allTodos];
      newTodo[currentEdit]=currentEditedItem;
      setAllTodos(newTodo);
      setCurrentEdit("");
    }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle (e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${iscompleted === false && 'active'}`}
            onClick={() => setIsCompleted (false)}
          >
            In Progress
          </button>
          <button
            className={`secondaryBtn ${iscompleted === true && 'active'}`}
            onClick={() => setIsCompleted (true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {iscompleted === false &&
            allTodos.map ((item, index) => {
              if(currentEdit===index){
                 return(
                  <div className='edit__wrapper' key={index}>
                  <input placeholder='Updated Title' 
                  onChange={(e)=>handleUpdateTitle(e.target.value)} 
                  value={currentEditedItem.title}  />
                  <textarea placeholder='Updated Title' 
                  rows={4}
                  onChange={(e)=>handleUpdateDescription(e.target.value)} 
                  value={currentEditedItem.description}  />
                   <button
              type="button"
              onClick={handleUpdateToDo}
              className="primaryBtn"
            >
              Update
            </button>
              </div> 
                 ) 
              }else{
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
  
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo (index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete (index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit  className="check-icon"
                        onClick={() => handleEdit (index,item)}
                        title="Edit?" />
                    </div>
  
                  </div>
                );
              }
              
            })}

          {iscompleted === true &&
            completedTodos.map ((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo (index)}
                      title="Delete?"
                    />
                  </div>

                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

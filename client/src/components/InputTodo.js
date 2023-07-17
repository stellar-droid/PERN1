import React, { useEffect, useState } from "react";
import ListTodo from "./ListTodo";
import './css/ListTodo.css';
// import ListTodo from './ListTodo';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Chip, Paper } from "@mui/material";


const InputTodo = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');
  const todosurl = `http://10.10.10.145:3000`; 
  const [searchList, setSearchList] = useState([]);
  const  [currentTodos, setCurrentTodos] = useState([]);
 //getting todos 
  const getTodos = async () => {
    try {
      const response = await fetch(`${todosurl}/todos`);
      const jsonData = await response.json();
      // if(todos.length !== jsonData.length)
      // {
      // }
      console.log("jsondata", jsonData);
      setTodos(jsonData);
      console.log(todos);
    } catch (error) {
      console.error(error.message);
    }
  };

  //delete todo function

  const deleteTodo = async (id) => {
    console.log("id")

    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if(confirmed){
      try {
        const deleteTodo = await fetch(`${todosurl}/todos/${id}`, {
          method: "DELETE",
        });
        setTodos(todos.filter((todo) => todo.todo_id !== id));
        console.log(deleteTodo);
      } catch (error) {
        console.error(error.message); 
      }
    };
    }
    
    

  useEffect(() => {
    getTodos();
  }, []);


      // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  // const currentTodos = !searchList ? todos.slice(indexOfFirstTodo, indexOfLastTodo)
  //                                  : searchList.slice(indexOfFirstTodo, indexOfLastTodo);  

  useEffect(() => {
    setCurrentTodos(searchList.length === 0 ? todos.slice(indexOfFirstTodo, indexOfLastTodo)
                                  : searchList.slice(indexOfFirstTodo, indexOfLastTodo));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchList,todos]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };   



  const onSubmitForm = async (e) => {
    // console.log("event",e);
    e.preventDefault();

    //Prevent empty todo descrition
    if (description.trim() === "") {
      alert("Please enter a description");
      return;
    }


    try {
      const body = { description };
      const response = await fetch(`${todosurl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      // window.location = "/";
      if (response.status === 200) {
        getTodos();
        setSuccessMessage('Todo added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const [description, setDescription] = useState("");
  const settingdescription = (e) => {
    setDescription(e.target.value);
    
  };
  
  return (
    <>

      {/* searchbar component with props setSearchList setSearchList(todos.filter((todo) => todo.description.toLowerCase().includes(searchTerm.toLowerCase())) */}
      <div className="searchbar"> 
      {/* If  */}
      <input type="text" placeholder="Search.." onChange={(e) =>  setSearchList(todos.filter((todo) => todo.description.toLowerCase().includes(e.target.value.toLowerCase())))}/>
      <Icon sx={{ color: green[500] }} fontSize="large">search</Icon>
      </div>
      {/* searchbar component with props setSearchList setSearchList(todos.filter((todo) => todo.description.toLowerCase().includes(searchTerm.toLowerCase())) */}
     
     
     
     
     
     
      <Paper 
      component="form"
      sx={{ p: '2px 4px', alignItems: 'center', width: 900 }}
      >
      <h1 className="text-center mt-5">PERN TODO</h1>
      {successMessage && <div className='success-message'>{successMessage}</div>}
      <form className="d-flex mt-5" >
       
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={settingdescription}
        />
        <Button className=" "  onClick={onSubmitForm}>
          {" "}
          Add
        </Button>
        
      </form>
      {todos.length > 0 && <ListTodo todos={currentTodos} deleteTodo={deleteTodo} />}

      <Pagination
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      

    {todos.length <= 0 && "NO DATA AVAILABLE to show"}
      </Paper>
    </>
  );
};

export default InputTodo;


const Pagination = ({ currentPage,todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }
    
  return (
    <nav className="nav">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#!"
              className="page-link"
            >
             <Chip color="info"
             key={number}
             label={number}>
             {/* {number} */}
             disabled={currentPage === number}
              </Chip> 
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};






  

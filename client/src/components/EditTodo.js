import {useState} from 'react';
// import ListTodo from './ListTodo';
const EditTodo = ({todos}) => {
    
    const[description, setDescription] = useState(todos.description);
    const todosurl = `http://10.10.10.145:3000`; 
    
     const settingDescription = (e) => {
        setDescription(e.target.value)
     }



       //update description function
       
         const updateDescription = async(e) => {
            // e.preventDefault();

            if (description.trim() === "") {
              alert("Please enter a description");
              return;
            }

            try {
                const body = {description};
                const response = await fetch(`${todosurl}/${todos.todo_id}`,{
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                console.log(response);
                window.location = "/";
            } catch (error) {
                console.error(error.message);
            }
         }

    return(

        <>
           
<button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todos.todo_id}`}>
 Edit
</button>


<div className="modal" id={`id${todos.todo_id}`} >
  <div className="modal-dialog">
    <div className="modal-content">

     
      <div className="modal-header">
        <h4 className="modal-title"> Edit TODO</h4>
        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todos.description)}>&times;</button>
      </div>

     
      <div className="modal-body">
        <input type="text" className='form-control' value={description} onChange={settingDescription}/>
      </div>

     
      
      
      <div className="modal-footer">

      <button type="button" className="btn btn-warning f-left p-2 d-flex" data-dismiss="modal" onClick={ async()=> updateDescription()}>Save</button>

        
      </div>

    </div>
  </div>
</div>
        </>
    )
}
export default EditTodo;
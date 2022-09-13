import { useEffect, useState } from "react";
import List from "./componants/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if( list ){
    return ( list = JSON.parse(list))
  } else {
    return [];
  }
};

function App() {
  const [ name, setName] = useState("");
  const [ list, setList] = useState(getLocalStorage());
  const [ isEditing, setIdEditing] = useState(false);
  const [ editId, setEditId] = useState(null);
  // const [ isStatus, setStatus] = useState(false);
  // const [ isDone, markDone] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if( !name ){
      //just skip this
    }else if( name && isEditing ){
      setList(
        list.map((item) => {
          if( item.id === editId ){
            return { ...item, title: name}
          }
          return item
        })
      );
      setName("");
      setEditId(null);
      setIdEditing(false);
    } else{
      let makeId = list.length + 1;
      let newItem = { id: makeId, title: name, status: false};
      setList([...list, newItem]);
      setName("");
    }
  };
  const removeItem = (id) => {
    setList( list.filter( (item) => item.id !== id ));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id );
    setIdEditing( true );
    setEditId( id );
    setName( editItem.title );
  };
  const markItem = (id) => {
    // const markItem = list.find((item) => item.id === id );
    // setStatus( true );
    // setEditId( id );
    // markDone( markItem.status );
    
    //list elements status will change here
    list.map((item) => {
      if( item.id === id && item.status === false ){
        return { ...item, status: true};
      }else if( item.id === id && item.status === true ){
        return { ...item, status: false};
      }
      return item;
    })
    
    // console.log( list );

    // if( isDone === false && isStatus ){
    //   setList(
    //     list.map((item) => {
    //       if( item.id === editId ){
    //         return { ...item, status: true}
    //       }
    //       return item
    //     })
    //   );
    //   isDone(null);
    //   isStatus(false);
    // }else if( isDone === true && isStatus ){
    //   setList(
    //     list.map((item) => {
    //       if( item.id === editId ){
    //         return { ...item, status: true}
    //       }
    //       return item
    //     })
    //   );
    //   isDone(null);
    //   isStatus(false);
    // }
  };
  
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        <h3 style={{marginBottom: "1.5rem", textAlign: "center"}}>Todo List App</h3>
        <div className="mb-3 form">
          <input 
          type="text"
          className="form-control"
          placeholder="add task"
          onChange={(e) => setName(e.target.value)}
          value = {name}></input>
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
      {list.length > 0 && (
          <List items={list} removeItem={removeItem} editItem={editItem} markItem={markItem}/>
      )}
    </section>
    
  );
}

export default App;

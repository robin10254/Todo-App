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

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if( !name ){
      
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
      const newItem = { id: new Date().getTime().toString(), title: name};
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
    setName( editItem.title);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h3>Todo List App</h3>
      <input 
      type="text"
      placeholder="type here"
      onChange={(e) => setName(e.target.value)}
      value = {name}></input>
      <button type="submit">Submit</button>
      {list.length > 0 && (
        <List items={list} removeItem={removeItem} editItem={editItem}/>
      )}
    </form>
  );
}

export default App;

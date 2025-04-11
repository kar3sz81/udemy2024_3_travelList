import { useState } from 'react'
import './App.css'

export default function App() {
  const[items,setItems]=useState([])
  
  function handleAddItems(item){
    setItems(items=>[...items,item])
  }
  function handleDeleteItem(id){
    setItems(items=>items.filter(item=>item.id!==id))
  }
  function handleToggleItem(id){
    setItems((items)=>
    items.map((item)=>
    item.id===id?{...item,packed:!item.packed}   
      : item
    )
    )
  }
  function handleClearList(){
    const confirmed=window.confirm('Are You Sure?')
    if(confirmed)setItems([])
  }

  return <div className='app'>
    <Logo/>
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items} onDeleteItem={handleDeleteItem} onToggelItem={handleToggleItem} onClearList={handleClearList}/>
    <Stats items={items}/> 
  </div>
}

  function Logo(){
    return<h1>🌴 Far Away 🎒</h1>
  }
  
  function Form({onAddItems}){
    const [description,setDescription]=useState("")
    const [quantity,setQuantity]=useState(1)
  
    function handleSubmit(e){
      e.preventDefault();
      
      if(!description) return; 

      const newItem={description,quantity,packed:false,id:Date.now()}
      console.log(newItem)
      onAddItems(newItem)
      setDescription("")
      setQuantity(1)
    }
  
    return<form className="add-form" onSubmit={handleSubmit}>
      <h3> Waht do you need for your 😎 trip?</h3>
      <select onChange={(e)=> setQuantity(Number(e.target.value))} value={quantity}>
       {/* {Array.from({lenght:20}, (_,i)=> i+1).map
       ((num)=>(
        <option value={num} key={num}>
          {num}
        </option>
       ))} */}
       
       <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <input type="text" placeholder='Item..' value={description} onChange={(e)=>setDescription(e.target.value)}/>
      <button> Add</button>
    </form>
  }
  
  //{props.item.description} {props.item.quantity}
  //{initialItems.map((item)=>(<li>HIy</li>) )}
  function PackingList({items, onDeleteItem, onToggelItem, onClearList}){
    const[sortBy,setSortBy]=useState("input")
    let sortedItems;

    if(sortBy==='input') sortedItems=items;

    if(sortBy==="description") sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.descreption))

    if(sortBy==="packed") sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
 
    return (
    <div className='list'>
      <ul >
      {sortedItems.map((item)=>(<Item item={item} onDeleteItem={onDeleteItem} onToggelItem={onToggelItem} key={item.id}/>) )}
      </ul>
      <div className="actions"> 
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}> 
          <option value="input">sorrt by input order</option>
          <option value="description">sorrt by decscription</option>
          <option value="packed"> sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
    );
  }

  function Item({item, onDeleteItem, onToggelItem}){
    return (
      <li>
        <input type='checkbox' value={item.packed} onChange={()=>{onToggelItem(item.id)}}/> 
        <span style={item.packed?{textDecoration:"line-through"}:{}}>
        {item.quantity }{" "}{item.description}
        </span>
        <button onClick={()=>onDeleteItem(item.id)}> ❌</button>
      </li>
    
    )
  } 

  function Stats({items}){
    if(!items.length )
      return(
        <p className='stats'>
          <em> Start add some item..</em>
        </p>
      )

    const numItems=items.length
    const numPacked =items.filter((item)=>item.packed).length
    const percentage= Math.round(numPacked / numItems *100) 
    
    return <footer className='stats'>
      <em> 
      {percentage===100 ?  'You got all, now RUN!!' : 
      `🧳 You have${numItems} items on your list, and you already packed ${numPacked } (${percentage }%)`
  }
      </em>
    </footer>
  }



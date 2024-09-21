import { useState } from "react"


const App = () => {
  let Data = [
    {
      id:1,
      task:"Task 1",
      desc:"Description 1"
    },
    {
      id:2,
      task:"Task 2",
      desc:"Description 2"
    },
    {
      id:3,
      task:"Task 3",
      desc:"Description 3"
    }
  ]

  let [data,setData] = useState(Data)
  let [modal1,setModal1] = useState(false)
  let [modal2,setModal2] = useState(false)
  let [title,setTitle] = useState("")
  let [desc,setDesc] = useState("")
  let [title2,setTitle2] = useState("")
  let [desc2,setDesc2] = useState("")
  let [idx,setIdx] = useState(null)

  function Post(){
    if(title!="" && desc!=""){
      data.push({
        id:data.length+1,
        task:title,
        desc:desc
      });
      setData(data);
      setModal1(false)
    }
  }

  function OpenEdit(e) {
    setModal2(true);
    setIdx(e.id);
    setTitle2(e.task); 
    setDesc2(e.desc);
  }

  function Edit(){
    if(title2!="" && desc2!=""){
      data = data.map((e)=>{
        if(e.id==idx){
          e.task = title2;
          e.desc = desc2;
        }
        return e;
      })
      setData(data);
      setModal2(false);
      setTitle2(""); 
      setDesc2("");
    }
  }

  function Delete(id) {
    data = data.filter((e)=>e.id!=id);
    setData(data);
  }



  return (
    <>
      <button onClick={()=>setModal1(true)} className="p-[10px_20px] bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full shadow-[0px_0px_10px_violet my-[20px] ml-[20px]">Add Task</button>
      <div className="flex gap-[20px] ml-[20px] mb-[20px]">
        {data.map((e)=>{
          return <div className="shadow-[0px_0px_10px_blue] p-[15px] rounded-3xl" key={e.id}>
            <h3 className="text-[20px] font-bold">{e.task}</h3>
            <p className="my-[5px]">{e.desc}</p>
            <button className="p-[5px_10px] text-white bg-blue-700 rounded-full mr-[10px]" onClick={()=>OpenEdit(e)}>Edit</button>
            <button className="p-[5px_10px] text-white bg-red-600 rounded-full" onClick={()=>Delete(e.id)}>Delete</button>
          </div>
        })}
      </div>
      {modal1 && <div className="absolute top-[30vh] left-[45%] shadow-[0px_0px_10px_black] p-[20px] rounded-lg">
        <input className="block p-[10px] shadow-[0px_0px_5px_black] rounded-md mb-[15px]" type="text" onChange={(e)=>setTitle(e.target.value)} name="" placeholder="Task name:" />
        <input className="block p-[10px] shadow-[0px_0px_5px_black] rounded-md mb-[15px]" type="text" onChange={(e)=>setDesc(e.target.value)} name="" placeholder="Task description:" />
        <button className="block mb-[8px] p-[7px_23px] rounded-full bg-green-600 text-white" onClick={()=>Post()}>Save</button>
        <button className="block p-[7px_23px] rounded-full bg-blue-600 text-white" onClick={()=>setModal1(false)}>Cancel</button>
      </div>}
      {modal2 && <div className="absolute top-[30vh] left-[45%] shadow-[0px_0px_10px_black] p-[20px] rounded-lg">
        <input className="block p-[10px] shadow-[0px_0px_5px_black] rounded-md mb-[15px]" type="text" value={title2} onChange={(e)=>setTitle2(e.target.value)} name="" placeholder="Task name:" />
        <input className="block p-[10px] shadow-[0px_0px_5px_black] rounded-md mb-[15px]" type="text" value={desc2} onChange={(e)=>setDesc2(e.target.value)} name="" placeholder="Task description:" />
        <button className="block mb-[8px] p-[7px_23px] rounded-full bg-green-600 text-white" onClick={()=>Edit()}>Save</button>
        <button className="block p-[7px_23px] rounded-full bg-blue-600 text-white" onClick={()=>setModal2(false)}>Cancel</button>
      </div>}
    </>
  )
}

export default App
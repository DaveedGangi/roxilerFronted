
import {Component} from "react"

import {format} from "date-fns"

import Popup from 'reactjs-popup';

import {v4 as uuidV4} from "uuid"

import "./index.css"

import Pagination from "../pagination";






class Roxiler extends Component{

    state={pageNumber:1,duplicateSearchedStorage:[],searchedValue:"",storageOfListOfTasks:[],title:"",description:"",price:"",image:"",sold:"",date:"",category:""}

    componentDidMount(){
        this.fetchAllTasks()
    }

    fetchAllTasks=async()=>{

        const api="https://roxilerbackend-1-vuyd.onrender.com/tasks"
        const response=await fetch(api)
        console.log(response)

        if(response.ok===true){
            const responseToJson=await response.json()

            console.log(responseToJson)

            const dataStoreTasks=responseToJson.map((each)=>({
                id:each.id,
                title:each.title,
                sold:each.sold,
                price:each.price,
                image:each.image,
                description:each.description,
                dateOfSale:each.dateOfSale,
                category:each.category
            }))
            
            this.setState({duplicateSearchedStorage:dataStoreTasks.slice(0,10),storageOfListOfTasks:dataStoreTasks})


        }


    }

    addDataToTheServerSide=async()=>{
      const {title,image,description,price,category,date,sold}=this.state
      console.log("Sending Task Data")
      const newTaskAdding={
        id:parseInt(uuidV4()),
        title:title,
        description:description,
        image:image,
        price:price,
        category:category,
        dateOfSale:date,
        sold:sold
      }
      console.log(newTaskAdding)
      const api="https://roxilerbackend-1-vuyd.onrender.com/taskAdd"
      const option={
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      
        body:JSON.stringify(newTaskAdding),
        
      }
      const response=await fetch(api,option)
      console.log(response)
    }


    userTitle=(event)=>{
      this.setState({title:event.target.value})
    }
    userDescription=(event)=>{
      this.setState({description:event.target.value})
    }
    userPrice=(event)=>{
      this.setState({price:event.target.value})
    }
    userCategory=(event)=>{
      this.setState({category:event.target.value})
    }
    userDate=(event)=>{
      this.setState({date:event.target.value})
    }
    userImageUrl=(event)=>{
      this.setState({image:event.target.value})
    }
    userSold=(event)=>{
      this.setState({sold:event.target.value})
    }

    deleteProduct=async(id)=>{

      const apiDelete=`https://roxilerbackend-1-vuyd.onrender.com/tasks/${id}`

      const optionForDelete={
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json"

        },
        body:JSON.stringify(id)
      }
      const responseDelete=await fetch(apiDelete,optionForDelete)

      console.log(responseDelete)

    }

    searchUser=(event)=>{

      this.setState({searchedValue:event.target.value})
    }

    showSearchedData=()=>{

      const{searchedValue,duplicateSearchedStorage}=this.state 

      const filterData=duplicateSearchedStorage.filter((each)=>each.title.toLowerCase().includes(searchedValue.toLowerCase()))

      console.log(filterData)
      this.setState({duplicateSearchedStorage:filterData,searchedValue:""})

    }

    changeToNextPage=(number)=>{
      const{storageOfListOfTasks}=this.state

      this.setState({duplicateSearchedStorage:storageOfListOfTasks.slice(
        number*10-10,number*10
      ),pageNumber:number})
    }

    render(){

        const {pageNumber,storageOfListOfTasks,searchedValue,duplicateSearchedStorage,title,image,description,price,category,sold,date}=this.state
        

        return(

            <div>

              <div>

              <div className="nav-bar">
                <h1 className="roxiler-head">Roxiler</h1>

                <div>
                  <input  value={searchedValue} onChange={this.searchUser} type="search" placeholder="Enter the title of products"/>
                  <button className="search-button" onClick={this.showSearchedData} type="button">Search</button>
                </div>
                </div>

                <div>
                 

  <Popup
    trigger={
    
    <div className="buttonAddTaskBg"><button type="button" className="button"> CREATE TASK </button></div>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Create Your Own Task </div>
        <div className="content">
          {' '}
          <label htmlFor="title">Add title:&nbsp; &emsp;&emsp;&emsp;&emsp;</label>
            <input value={title} onChange={this.userTitle} className="inputs" id="title" placeholder="title" type="text"/>
            <br/>
            <br/>
            <label htmlFor="description">Add description:&emsp; </label>
            <input value={description} onChange={this.userDescription} className="inputs" id="description" placeholder="description" type="text"/>
            <br/>
            <br/>
            <label htmlFor="price">Add price:&ensp;&nbsp; &emsp;&emsp;&emsp;</label>
            <input value={price} onChange={this.userPrice} className="inputs" id="price" placeholder="price" type="text"/>
            <br/>
            <br/>
            <label htmlFor="category">Add category:&emsp;&emsp; </label>
            <input value={category} onChange={this.userCategory} className="inputs" id="category" placeholder="category" type="text"/>
            <br/>
            <br/>
            <label htmlFor="imageUrl">Add image url: &emsp;&ensp;&nbsp;</label>
            <input value={image} onChange={this.userImageUrl} className="inputs" id="imageUrl" placeholder="image url" type="text"/>
            <br/>
            <br/>
            <label htmlFor="sold">Add sold: &emsp;&emsp;&emsp;&emsp;</label>
            <input value={sold} onChange={this.userSold} className="inputs" id="sold" placeholder="sold for 0 or sold out for 1" type="text"/>
            <br/>
            <br/>
            <label htmlFor="date">Add date: &emsp;&emsp;&emsp;&emsp;</label>
            <input value={date} onChange={this.userDate} className="inputs" id="date" type="date"/>
            <br/>
            <br/>
         
         
          
        <button className="button" type="button" onClick={this.addDataToTheServerSide}>TASK ADD</button>
    
        </div>
        <div className="actions">
          <Popup
            trigger={<button type="button" className="button"> SAVE TASK </button>}
            position="top center"
            nested
          >
            <span className="spanForSaveAfter">
             Your Task is Successfully Added!
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    )}
  </Popup>
                </div>

                <div className="each-product">
                    {
                        duplicateSearchedStorage.map((each)=>(
                            <div className="cartItem" key={each.id}>
                                <div className="leftSide">
                                <h1 className="title">{each.title}</h1>
                                <img className="eachImage" src={each.image} alt={each.title}/>
                                </div>
                                <div className="rightSide">
                                <p className="description">{each.description}</p>
                                <h1 className="category">category: {each.category}</h1>
                                <h1 className="price">Price: {each.price} rupees</h1>
                                <h1 className="date">date of sale: {format(each.dateOfSale,"do MMMM yyyy")}</h1>
                                <h1 className="sold">sold out or not : {each.sold===0?"sold out":"not sold out"}</h1>
                                </div>

                                <div>
                                  <button onClick={()=>{this.deleteProduct(each.id)}} type="button">Delete</button>
                                </div>
                            </div>
                        ))

                    }
                </div>
           
           
           
           

           </div>

           <Pagination changeToNextPage={this.changeToNextPage} allData={storageOfListOfTasks} pageNumber={pageNumber}/>
           
            </div>
        )
    }
}

export default Roxiler
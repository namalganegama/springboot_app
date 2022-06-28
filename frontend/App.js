import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      id:'',
      movieName:'',
      time:'',
      price:'',
      theater:''
    }

  }
  componentDidMount(){
    axios.get("http://localhost:7080/cartservice/list")
    .then((res)=> {

      console.log(res.data);

      this.setState({
      users:res.data,
      id:'',
      movieName:'',
      time:'',
      price:'',
      theater:''
      })
    })

  }

  submit(event,id){
    event.preventDefault();
    if(id !== 0){
      axios.post("http://localhost:7080/cartservice/save",{
        id:this.state.id,
        movieName:this.state.movieName,
        time:this.state.time,
        price:this.state.price,
        theater:this.state.theater
      })
      .then((res)=>{
        alert('Item data Inserted successfully');
        this.componentDidMount();
      })
      .catch(error => {
        alert(error.message);
    });
    }
  }
  
    update(event,id){
      event.preventDefault();
        axios.put(`http://localhost:7080/cartservice/update/${id}`,{
          id:this.state.id,
          movieName:this.state.movieName,
          time:this.state.time,
          price:this.state.price,
          theater:this.state.theater
      }).then((res)=>{
        alert('Item data Updated successfully');
        this.componentDidMount();
      }) 
      .catch(error => {
        alert(error.message);
    });
    }



  delete(event,id){
    event.preventDefault();
    axios.delete(`http://localhost:7080/cartservice/delete/${id}`)
    .then(()=>{
      alert('Item data Deleted successfully');
      this.componentDidMount();
    })
  }

  edit(id){
    axios.get(`http://localhost:7080/cartservice/list/${id}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        id:res.data.id,
        movieName:res.data.movieName,
        time:res.data.time,
        price:res.data.price,
        theater:res.data.theater

      })
    })
  }
  

  render(){
  return (

    <div className="container">
    <br></br>
    <br></br>
      <div className="row">
      <div className="col s6">
    
        <form>
      
 <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Ticket Number</label>
  <input onChange={(e)=>this.setState({id:e.target.value})} value={this.state.id} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Ticket Number "/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Movie Name</label>
  <input onChange={(e)=>this.setState({movieName:e.target.value})} value={this.state.movieName} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Movie Name "/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Movie Time</label>
  <input onChange={(e)=>this.setState({time:e.target.value})} value={this.state.time} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Movie Time "/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Ticket Price</label>
  <input onChange={(e)=>this.setState({price:e.target.value})} value={this.state.price} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Ticket Price"/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Theater</label>
  <input onChange={(e)=>this.setState({theater:e.target.value})} value={this.state.theater} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Theater"/>
</div>


<button onClick={(e)=>this.submit(e,this.state.id)} type="submit" class="btn btn-primary ">Submit</button>&nbsp;

<button onClick={(e)=>this.update(e,this.state.id)} type="submit" class="btn btn-warning">Update</button>&nbsp;

<button onClick={(e)=>this.delete(e,this.state.id)} type="submit" class="btn btn-danger">Delete</button>&nbsp;


        </form>
      </div>
      <div className="col s6">
      <h1> Movie Manager App Cart</h1><br></br>
      <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Movie Name</th>
      <th scope="col">Movie Time</th>
      <th scope="col">Ticket Price</th>
      <th scope="col">Theater</th>
      <th scope="col">View</th>
      
    </tr>
  </thead>
  <tbody>
    
    {
      this.state.users.map(user=>
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.movieName}</td>
          <td>{user.time}</td>
          <td>Rs. {user.price}/=</td>
          <td>{user.theater}</td>  
          <td><button onClick={(e)=>this.edit(user.id)} type="submit" class="btn btn-success">View Ticket</button></td> 
                    
        </tr>



        )
    }
    
  
  </tbody>
</table>
      </div>
      </div>
    </div>

  );    
  }  
}

export default App;
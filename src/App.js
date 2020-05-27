import React, { Component } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
		newItem: '',
        todoList: [
            { title: "todo1", isComplete: true },
            { title: "todo2", isComplete: true },
            { title: "todo3", isComplete: true },
            { title: "todo4", isComplete: true },
        ]
    }
    this.onAllItemClick = this.onAllItemClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClick(item) {
    this.setState({
      todoList: this.state.todoList.map((i) => {
        if(i.title === item.title) {
          i.isComplete = !i.isComplete;
        }
        return i;
      })
    });
  }

  onAllItemClick() {
    this.setState({
      todoList: this.state.todoList.map((i) => {
        return i.isComplete = !i.isComplete;
      })
    });
  }

  onKeyUp(event) {
	let text = event.target.value;
    if(event.keyCode === 13) { // enter code
      if(!text) {
        return;
      }
  
      text = text.trim();
      if(!text) { return; }
  
      this.setState({
        todoList: [
          {title: text, isComplete: false},
          ...this.state.todoList
		],
		newItem: ''
      });
    } else {
		this.setState({
			newItem: text
		});
	}
  }

  onChange(event) {
	  this.setState({
		  newItem: event.target.value
	  });
  }

  render() {
    return (
        <div className="App">
          <div className="Header d-flex justify-content-between align-items-center">
            <i onClick={this.onAllItemClick} className="fas fa-chevron-down"></i>
			<input 
				className="inputTodo" 
				placeholder="What needs to be done?" 
				value={this.state.newItem}
				onChange={this.onChange}
				onKeyUp={this.onKeyUp}></input>
          </div>
            {
                this.state.todoList.length > 0 &&
                this.state.todoList.map((item, index) => {
                  return  <TodoItem key={index} item={item} onClick={() => this.onItemClick(item)}/>;
                })
            }
            {
                this.state.todoList.length === 0 && <div>Nothing is there.</div>
            }
        </div>
    );
  }
}

export default App;

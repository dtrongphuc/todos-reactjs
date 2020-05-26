import React, { Component } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        todoList: [
            { title: "todo1", isComplete: false },
            { title: "todo2", isComplete: false },
            { title: "todo3", isComplete: false },
            { title: "todo4", isComplete: false },
        ]
  	} 
  }

  onItemClick(item) {
    this.setState({
      todoList: this.state.todoList.map((i) => {
        if(i.title === item.title) {
          i.isComplete ? i.isComplete = false : i.isComplete = true;
        }
        return i;
      })
    });
  }

  render() {
    return (
        <div className="App">
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

import React, { Component } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      todoList: [
        { title: "todo1", isComplete: false },
        { title: "todo2", isComplete: false },
        { title: "todo3", isComplete: false },
        { title: "todo4", isComplete: false },
      ],
    };
    this.onAllItemClick = this.onAllItemClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  onChecked(item) {
    return () => {
      this.setState({
        todoList: this.state.todoList.map((i) => {
          if (i.title === item.title) {
            i.isComplete = !i.isComplete;
          }
          return i;
        })
      });
    };
  }

  onAllItemClick() {
    let TodoItems = this.state.todoList;
    let on = TodoItems.filter((i) => i.isComplete === false);
    this.setState({
      todoList: TodoItems.map((i) => {
        i.isComplete = on.length > 0 ? true : false;
        return i;
      }),
    });
  }

  onKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      // enter code
      if (!text) {
        return;
      }

      text = text.trim();
      if (!text) {
        return;
      }

      this.setState({
        todoList: [{ title: text, isComplete: false }, ...this.state.todoList],
        newItem: "",
      });
    } else {
      this.setState({
        newItem: text,
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }

  onClickRemove(index) {
	return () => {
		const { todoList } = this.state;
		this.setState({
		  todoList: [
			...todoList.slice(0, index),
			...todoList.slice(index + 1, todoList.length),
		  ],
		});
	}  
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
            onKeyUp={this.onKeyUp}
          ></input>
        </div>
		{
			this.state.todoList.length > 0 &&
			this.state.todoList.map((item, index) => {
				return (
					<TodoItem
						key={index}
						item={item}
						checked = {this.onChecked(item)}
						onChange = {this.onChecked(item)}
						onClick = {this.onClickRemove(index)}
					/>
				);
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

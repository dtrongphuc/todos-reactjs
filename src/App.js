import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import classNames from 'classnames';
import "./App.css";
import TodoItem from "./components/TodoItem";

const STORAGEKEY= "react-todos";
const ALL = "all";
const ACTIVE = "active";
const COMPLETED = "completed";
class App extends Component {
    constructor(props) {
        super(props);
        let dataString = localStorage.getItem(STORAGEKEY);
        let localData = JSON.parse(dataString);
        this.state = {
            newItem: "",
            currentFilter: ALL,
            todoList: localData || []
        };
        this.onAllItemClick = this.onAllItemClick.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onSelectItemClick = this.onSelectItemClick.bind(this);
        this.onClearItemsClick = this.onClearItemsClick.bind(this);
        this.onEditing = this.onEditing.bind(this);
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

            let todoList = this.state.todoList;
            this.setState({
                todoList: [...this.state.todoList, {title: text, isComplete: false}],
                newItem: "",
            });
            todoList = [...todoList, {title: text, isComplete: false}];
            localStorage.setItem(STORAGEKEY, JSON.stringify(todoList));
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
            let { todoList } = this.state;
            this.setState({
                todoList: [
                    ...todoList.slice(0, index),
                    ...todoList.slice(index + 1, todoList.length)
                ]
            });
            todoList = [
                ...todoList.slice(0, index),
                ...todoList.slice(index + 1, todoList.length)
            ]
            localStorage.setItem(STORAGEKEY, JSON.stringify(todoList));
        }  
    }

    onSelectItemClick(e) {
        let currentId = e.target.id;
        var selected = '';
        switch(currentId) {
            case 'all':
                selected = ALL;
                break;
            case 'active': 
                selected = ACTIVE;
                break;
            default: 
                selected = COMPLETED;
        }
        this.setState({
            currentFilter: selected
        });
    }

    onClearItemsClick() {
        this.setState({
            todoList: this.state.todoList.filter(item => item.isComplete === false)
        });
        let todoList = this.state.todoList.filter(item => item.isComplete === false);
        localStorage.setItem(STORAGEKEY, JSON.stringify(todoList));
    }

    onEditing(e) {
        console.log(e.target.tagName);
    }

    render() {
        const { todoList } = this.state;
        const todosActive = todoList.filter((item) => item.isComplete === false);
        const todosComplete = todoList.filter((item) => item.isComplete === true);
        return (
        <div className="App">
                <Router>
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
                    <Switch>
                        <Route exact path="/">
                            {							
                                todoList.length > 0 &&
                                todoList.map((item, index) => {
                                    return (
                                        <TodoItem
                                            key={index}
                                            item={item}
                                            checked = {this.onChecked(item)}
                                            onChange = {this.onChecked(item)}
                                            onClick = {this.onClickRemove(index)}
                                            onDoubleClick = {this.onEditing}
                                        />
                                    );
                                })
                            }
                        </Route>
                        <Route path="/active">
                            {
                                todoList.length > 0 &&
                                todosActive.map((item, index) => {
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
                        </Route>
                        <Route path="/completed">
                            {
                                todoList.length > 0 &&
                                todosComplete.map((item, index) => {
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
                        </Route>
                    </Switch>
                    {
                        this.state.todoList.length > 0 &&
                        <div className="footer d-flex justify-content-center align-items-center">
                            <span className="count">{todosActive.length} items left</span>
                            <ul className="d-flex align-items-center">
                                <li className="btn all-btn" onClick={this.onSelectItemClick}>
                                    <Link to="/" id="all" className={classNames('option-link', {
                                        selected: this.state.currentFilter === ALL
                                    })} >All</Link>
                                </li>
                                <li className="btn active-btn" onClick={this.onSelectItemClick}>
                                    <Link to="/active" id="active" className={classNames('option-link', {
                                        selected: this.state.currentFilter === ACTIVE
                                    })}>Active</Link>
                                </li>
                                <li className="btn completed-btn" onClick={this.onSelectItemClick}>
                                    <Link to="/completed" id="completed" className={classNames('option-link', {
                                        selected: this.state.currentFilter === COMPLETED
                                    })}>Completed</Link>
                                </li>
                            </ul>
                            <span onClick={this.onClearItemsClick} className={classNames('clear-completed', {
                                hide: todosComplete.length === 0   
                            })}>Clear completed</span>
                        </div>
                    }
                </Router>
        </div>
        );
    }
}

export default App;

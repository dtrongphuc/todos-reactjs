import React, {Component} from 'react';
import classNames from 'classnames';
import './TodoItem.css'
class TodoItem extends Component {
    render() {
        const { item, onChange, onClick} = this.props;
        let checked = "";
        if(item.isComplete) {
            checked = "checked"
        }
        return (
            <div className={classNames('TodoItem', {
                complete: item.isComplete 
            })}>
                <input checked={checked} onChange={onChange} type="checkbox" className="todo-check"></input>
                <p>{item.title}</p>
                <i onClick={onClick} className="fas fa-times delete-btn"></i>
            </div>
        );
    }
}

export default TodoItem;
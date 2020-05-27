import React, {Component} from 'react';
import classNames from 'classnames';
import './TodoItem.css'
import checkCircle from '../img/circle.svg';
import checked from '../img/check.svg';
class TodoItem extends Component {
    render() {
        const { item, onClick } = this.props;
        let url = checkCircle;
        if(item.isComplete) {
            url = checked;
        }
        return (
            <div className={classNames('TodoItem', {
                complete: item.isComplete 
            })}>
                <img onClick={onClick} src={url} className="check-img" aria-hidden alt="this is check image"></img>
                <p>{item.title}</p>
                <i className="fas fa-times"></i>
            </div>
        );
    }
}

export default TodoItem;
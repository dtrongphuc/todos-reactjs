import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import './TodoItem.css'
class TodoItem extends Component {
    render() {
        const { item, onChange, onClick, onDoubleClick} = this.props;
        let checked = "";
        if(item.isComplete) {
            checked = "checked"
        }
        return (
            <div className={classNames('TodoItem', {
                complete: item.isComplete 
            })}>
                <input checked={checked} onChange={onChange} type="checkbox" className="todo-check"></input>
                <label onDoubleClick={onDoubleClick} className="label">{item.title}</label>
                <i onClick={onClick} className="fas fa-times delete-btn"></i>
            </div>
        );
    }
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        isComplete: PropTypes.bool.isRequired
    }),
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onDoubleClick: PropTypes.func
};

export default TodoItem;
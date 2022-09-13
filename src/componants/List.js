import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem, markItem}) => {
    
    return (
        <div>
            { items.map(( item ) => {
                const { id, title} = item;
                return (
                    <div className='list-group list-group-flush flex-container' key={id}>
                        <div className='list-group-item d-flex justify-content-between align-items-center'>
                            <input 
                            type="checkbox" className='check-box'
                            onChange={() => markItem(id)} 
                            />
                            <h6 className='text-align'>{title}</h6>
                        </div>
                        <div style={{float: "right"}}>
                            <button 
                            type="button" 
                            className='edit-btn'
                            onClick={() => editItem(id)}>
                                <FaEdit />
                            </button>
                            <button 
                            type="button" 
                            className='delete-btn'
                            onClick={() => removeItem(id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List;
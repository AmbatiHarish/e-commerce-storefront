import React from 'react';
import './DataTable.css';

const DataTable = ({ data, columns, actions }) => {
    return (
        <div className="DataTableContainer">
            <table className="DataTable">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        {actions && actions.length > 0 && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                            {actions && actions.length > 0 && (
                                <td>
                                    {actions.map((action, index) => (
                                        <button
                                            key={index}
                                            className={`${action.className || ''}`}
                                            onClick={() => action.onClick(row)}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

import React, { forwardRef, useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TextField from '@material-ui/core/TextField';

import { GOAL_CATEGORIES } from '../../../constants';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const useStyles = makeStyles(theme => ({
    table: {
        backgroundColor: '#111111',
    },
    innerTextField: {
        '& label.Mui-focused': {
            color: 'green',
        },
    },
}));


const ReviewGoalsTable = (props) => {
    const { goals } = props;

    const classes = useStyles();


    const [goalTableState, setGoalTableState] = useState({
        columns: [
            { title: 'Title', field: 'title' },
            {
                title: 'Description', field: 'description',
                editComponent: props => (
                    <TextField
                        {...props}
                        multiline
                        style={props.columnDef.type === 'numeric' ? { float: 'right' } : {}}
                        type={props.columnDef.type === 'numeric' ? 'number' : 'text'}
                        placeholder={props.columnDef.title}
                        value={props.value === undefined ? '' : props.value}
                        onChange={event => props.onChange(event.target.value)}
                        InputProps={{
                            style: {
                                fontSize: 13,
                            }
                        }}
                    />
                )
            },
            {
                title: 'Category',
                field: 'category',
                lookup: GOAL_CATEGORIES
            },
        ],
        data: [
            { title: 'test', description: 'test', category: GOAL_CATEGORIES.GOAL_CAT_EDUCATIONAL },
        ],
    });

    return (
        <MaterialTable
            style={{
                width: '100%',
            }}
            icons={tableIcons}
            title="Your goals"
            columns={goalTableState.columns}
            data={goalTableState.data}
            options={{
                filtering: false,
                search: false,
                selection: false,
                sorting: false,
                paging: false,
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setGoalTableState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setGoalTableState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setGoalTableState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}

export default ReviewGoalsTable;

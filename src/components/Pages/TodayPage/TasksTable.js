import React, { forwardRef, useEffect, useState } from 'react'
import MaterialTable, { MTableAction } from 'material-table';
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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3]):[0-5]\d|24:00)(:[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?$/;


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



const TasksTable = (props) => {
    const { tasks, onChangeTask } = props;

    const getRenderValue = (props) => {
        if (props.plannedtime instanceof Date) {
            return props.plannedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (isoDateRegex.exec(props.plannedtime)) {
            return new Date(props.plannedtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return props.plannedtime;
        }
    }

    const [tasksTableState, setTasksTableState] = useState({
        columns: [

            { title: 'Title', field: 'title' },
            {
                title: 'Description', field: 'description',
                editComponent: props => (
                    <TextField
                        value={props.value || ''}
                        placeholder='Description'
                        fullWidth={true}
                        multiline={true}
                        onChange={e => {
                            props.onChange(e.target.value)
                        }}
                        InputProps={{
                            style: {
                                fontSize: 13,
                            }
                        }}
                    />
                )
            },
            {
                title: 'Planned at',
                field: 'plannedtime',
                type: 'time',
                emptyValue: '12:00',
                editComponent: props => (
                    <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={props.dateTimePickerLocalization}>
                        <TimePicker
                            format="HH:mm"
                            value={props.value || null}
                            onChange={props.onChange}
                            clearable
                            InputProps={{
                                style: {
                                    fontSize: 13,
                                }
                            }}
                        />
                    </MuiPickersUtilsProvider>
                )
                ,
                render: props => getRenderValue(props)
            },

        ],
        data: tasks,
    });


    useEffect(() => {
        onChangeTask(tasksTableState.data);
        return;
    }, [tasksTableState]);


    const handleSave = (event, props) => {
        console.log(props);
        props.action.onClick(event, props.data);

    }

    return (
        <MaterialTable
            style={{
                width: isWidthUp('sm', props.width) ? "100%" : "85vw",
            }}
            localization={{
                body: {
                    emptyDataSourceMessage: 'No tasks defined.',
                }
            }}
            icons={tableIcons}
            title="Your tasks for tomorrow"
            columns={tasksTableState.columns}
            data={tasksTableState.data}
            components={{
                Action:
                    (props) => {
                        if (props.action.tooltip === "Save") {
                            return (
                                <Tooltip title={props.action.tooltip}>
                                    <IconButton
                                        onClick={(event) => handleSave(event, props)}>
                                        {typeof props.action.icon === "string" ? (
                                            <Icon {...props.action.iconProps}>{props.action.icon}</Icon>
                                        ) : typeof props.action.icon === "function" ? (
                                            props.action.icon({ ...props.action.iconProps, disabled: false })
                                        ) : (<props.action.icon />)}
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        else {
                            return <MTableAction {...props} />
                        }


                    }

            }}
            options={{
                filtering: false,
                search: false,
                selection: false,
                sorting: false,
                paging: false,
                headerStyle: {
                    fontSize: isWidthUp('sm', props.width) ? 'unset' : "2vh"
                }
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setTasksTableState(prevState => {
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
                                setTasksTableState(prevState => {
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
                            setTasksTableState(prevState => {
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

export default withWidth()(TasksTable);

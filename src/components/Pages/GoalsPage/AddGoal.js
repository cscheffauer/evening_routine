import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';


import {
    GOAL_CATEGORIES
} from '../../../constants'       //get constants form constants file



const categories = Object.values(GOAL_CATEGORIES);

const styles = theme => ({
    buttonAdd: {
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 30
    },
});

const initialNewGoal = {
    title: '',
    description: '',
    category: GOAL_CATEGORIES.GOAL_CAT_EDUCATIONAL,
}


class AddGoal extends Component {
    constructor(props) {
        super();
        this.state = {
            newGoal: initialNewGoal,
            open: false,
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChangeCategory(event) {
        let newState = Object.assign({}, this.state);
        newState.newGoal.category = event.target.value;
        this.setState(newState);
    }
    handleChangeTitle(event) {
        let newState = Object.assign({}, this.state);
        newState.newGoal.title = event.target.value;
        this.setState(newState);
    }
    handleChangeDescription(event) {
        let newState = Object.assign({}, this.state);
        newState.newGoal.description = event.target.value;
        this.setState(newState);
    }
    handleAdd(event, onAddGoal) {
        event.preventDefault();
        let newGoal = Object.assign({}, this.state.newGoal);    //copy the new goal to a completely fresh new object - to break any bindings
        onAddGoal(newGoal);

        this.handleClose();
    };

    handleClickOpen() {
        this.setState({ newGoal: Object.assign({}, initialNewGoal) });      //initialize a new goal (completely fresh new object) - cause react uses & reference
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        const { darkMode, classes, onAddGoal } = this.props;

        return (
            <Fragment>
                <Fab className={classes.buttonAdd} onClick={this.handleClickOpen} color={darkMode ? "secondary" : "primary"} aria-label="add">
                    <AddIcon />
                </Fab>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Add a new goal</DialogTitle>
                    <DialogContent>

                        <TextField
                            select
                            id="category"
                            label="Category"
                            fullWidth
                            onChange={this.handleChangeCategory}
                            margin="normal"
                            value={this.state.newGoal.category}
                            helperText="Please select the goal category"
                        >
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            autoFocus
                            margin="normal"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={this.handleChangeTitle}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="normal"
                            id="description"
                            label="Description"
                            placeholder="Type in a proper description of your goal."
                            multiline
                            type="text"
                            fullWidth
                            onChange={this.handleChangeDescription}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(e) => this.handleAdd(e, onAddGoal)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default withStyles(styles)(AddGoal);
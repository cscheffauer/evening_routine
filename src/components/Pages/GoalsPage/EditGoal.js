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

});


class EditGoalDialog extends Component {
    constructor(props) {
        super();
        this.state = {
            goalToBeEdited: {},
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
    }

    handleChangeCategory(event) {
        let newState = Object.assign({}, this.state);
        newState.goalToBeEdited.category = event.target.value;
        this.setState(newState);
    }
    handleChangeTitle(event) {
        let newState = Object.assign({}, this.state);
        newState.goalToBeEdited.title = event.target.value;
        this.setState(newState);
    }
    handleChangeDescription(event) {
        let newState = Object.assign({}, this.state);
        newState.goalToBeEdited.description = event.target.value;
        this.setState(newState);
    }

    componentDidUpdate() {
        if (this.props.initialGoal !== this.state.goalToBeEdited) {
            this.setState({ goalToBeEdited: this.props.initialGoal });
        }
    }
    render() {
        const { handleEdit, handleClose, initialGoal, index, open } = this.props;
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Edit existing goal</DialogTitle>
                <DialogContent>

                    <TextField
                        select
                        id="category"
                        label="Category"
                        fullWidth
                        onChange={this.handleChangeCategory}
                        margin="normal"
                        value={this.state.goalToBeEdited.category}
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
                        value={this.state.goalToBeEdited.title}
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
                        value={this.state.goalToBeEdited.description}
                        onChange={this.handleChangeDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={(e) => handleEdit(e, this.state.goalToBeEdited, index)} color="primary">
                        Save
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(EditGoalDialog);
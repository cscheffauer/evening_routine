import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import MenuItem from '@material-ui/core/MenuItem';


import {
    GOAL_CATEGORIES
} from '../../../constants'       //get constants form constants file


const categories = Object.values(GOAL_CATEGORIES);


class AddGoal extends Component {
    constructor(props) {
        super();
        this.state = {
            newGoal: {},
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
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

    componentDidUpdate() {
        this.state.newGoal !== this.props.initialGoal && this.setState({ newGoal: this.props.initialGoal })
    }

    render() {
        const { handleAdd, handleClose, open } = this.props;

        return (
            <Fragment>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

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
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={!(this.state.newGoal.title !== '' && this.state.newGoal.description !== '')} onClick={(e) => handleAdd(e, this.state.newGoal)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default AddGoal;
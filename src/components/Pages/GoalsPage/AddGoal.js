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



class AddGoal extends Component {
    constructor(props) {
        super();
        this.state = {
            newGoal: {
                category: GOAL_CATEGORIES.GOAL_CAT_EDUCATIONAL,
                title: '',
                description: '',
            },
            open: false,
        }
    }

    render() {
        const handleChangeCategory = (event) => {
            let newState = Object.assign({}, this.state);
            newState.newGoal.category = event.target.value;
            this.setState(newState);
        }
        const handleChangeTitle = (event) => {
            let newState = Object.assign({}, this.state);
            newState.newGoal.title = event.target.value;
            this.setState(newState);
        }
        const handleChangeDescription = (event) => {
            let newState = Object.assign({}, this.state);
            newState.newGoal.description = event.target.value;
            this.setState(newState);
        }

        const handleClickOpen = () => {
            this.setState({ open: true });
        };

        const handleClose = () => {
            this.setState({ open: false });
        };
        const handleAdd = () => {
            onAddGoal(this.state.newGoal);
            
            handleClose();
        };
        const { darkMode, classes, onAddGoal } = this.props;

        return (
            <Fragment>
                <Fab className={classes.buttonAdd} onClick={handleClickOpen} color={darkMode ? "secondary" : "primary"} aria-label="add">
                    <AddIcon />
                </Fab>
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add a new goal</DialogTitle>
                    <DialogContent>
                        <TextField
                            select
                            id="category"
                            label="Category"
                            fullWidth
                            margin="normal"
                            value={this.state.newGoal.category}
                            onChange={(e) => handleChangeCategory(e)}
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
                            onChange={(e) => handleChangeTitle(e)}
                            fullWidth
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
                            onChange={(e) => handleChangeDescription(e)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default withStyles(styles)(AddGoal);
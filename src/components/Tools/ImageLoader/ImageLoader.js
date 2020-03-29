import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

class ImageLoader extends Component {

    //image onLoad handler to update state to loaded
    onLoad = () => {
        this.props.onQuoteLoaded();
    };
    render() {
        let { className } = this.props;

        return <img
            alt="quoteImage"
            src={this.props.src}
            className={className}
            onLoad={this.onLoad} />
    }
}

export default withStyles(styles)(ImageLoader);
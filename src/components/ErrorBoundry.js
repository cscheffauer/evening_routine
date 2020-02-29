import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch() {        //if an error appears, this function will run = like try/catch in Java
        this.setState({ hasError: true })       //the state will be set to hasError=true and it will be rerendered 
    }

    render() {
        if (this.state.hasError) {      //if the error appeared, a proper error message will be displayed
            return <h1>Ooops. That is not good</h1>
        }
        return this.props.children      //will render the cardlist component when no errors appeared
    }
}

export default ErrorBoundry;
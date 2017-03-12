import React, {Component} from 'react';
let Menu = require('react-burger-menu').slide;

export default class MenuWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            hidden : false
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     const sideChanged = this.props.children.props.right !== nextProps.children.props.right;
    //
    //     if (sideChanged) {
    //         this.setState({hidden : true});
    //
    //         setTimeout(() => {
    //             this.show();
    //         }, this.props.wait);
    //     }
    // }

    show() {
        this.setState({hidden : false});
    }

    render() {
        let style;

        if (this.state.hidden) {
            style = {display: 'none'};
        }

        return (
            <div style={style} className="right">
                {this.props.children}
            </div>
        );
    }
}
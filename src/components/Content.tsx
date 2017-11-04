import React, { Component } from 'react'
import Header from './Header'
export interface HelloProps {
    compiler: string
    framework: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Content extends Component<HelloProps, undefined> {
    public render() {
        return <h1>Hello from2 {this.props.compiler} and {this.props.framework}!</h1>
    }
}
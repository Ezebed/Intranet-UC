import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            resetCondition: props.resetCondition,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.resetCondition !== state.resetCondition) {
            return { hasError: false, resetCondition: props.resetCondition };
        }
        return null;
    }

    componentDidCatch(error, errorInfo) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError || this.props.error) {
            return this.props.fallBackComponent;
        }

        return this.props.children;
    }
}

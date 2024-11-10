import React from "react";

/**
 * Atrapa Errores no cacheados de JavaScript y en caso de error elcontenido esreemplazadopor otro componente FallBack.
 *
 * @class ErrorBoundary
 *
 * @property {React.Node} FallBackComponent elemento a motrarse si el contenido del errorBoundary lanza un error.
 * @property {React.Node} children elemeto a mostrar si no hay ningun error presente.
 * @property {any} resetCondition condicion para indicar si se soluciono el error y volver a mostrar el contenido del errorBoundary.
 *
 * @private {Boolean} hasError indica al ErrorBoundary si debe mostrar el elemento fallback o no.
 */
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

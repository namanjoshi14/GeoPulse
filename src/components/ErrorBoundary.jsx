import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '20px',
                    margin: '20px',
                    border: '2px solid red',
                    borderRadius: '8px',
                    backgroundColor: '#ffe6e6',
                    color: '#d00'
                }}>
                    <h2>Something went wrong</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Error details</summary>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
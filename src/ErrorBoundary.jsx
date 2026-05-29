import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Log error for debugging
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{padding:20}}>
          <h1>Something went wrong.</h1>
          <p>We're sorry — an unexpected error occurred.</p>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state.error && this.state.error.stack}
          </details>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Déco Murale component:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', backgroundColor: '#FAF8F5', borderRadius: '16px', border: '1px solid #EAE2D7' }}>
          <h2 style={{ fontSize: '24px', color: '#1F2421', marginBottom: '12px' }}>
            Déco Murale Mag - Chargement de l'application
          </h2>
          <p style={{ color: '#5E5246', fontSize: '14px', marginBottom: '20px' }}>
            Une légère erreur de chargement est survenue. Veuillez rafraîchir la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', backgroundColor: '#C86D51', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Recharger la page / Reload Page
          </button>
          {this.state.error && (
            <pre style={{ marginTop: '20px', padding: '12px', background: '#F2ECE4', borderRadius: '8px', fontSize: '12px', color: '#8C3B24', textAlign: 'left', overflowX: 'auto' }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

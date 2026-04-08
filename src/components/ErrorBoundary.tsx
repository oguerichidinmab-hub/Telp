import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-sm space-y-6">
            <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold">!</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-gray-800">Something went wrong</h1>
              <p className="text-sm text-gray-500">The app encountered an unexpected error. Don't worry, your data is safe.</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform shadow-lg shadow-blue-200"
            >
              Refresh App
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

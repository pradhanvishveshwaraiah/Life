import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LifeBridge runtime error caught:', error, errorInfo);
  }

  handleReload = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#18212B] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-4">
            <div className="w-12 h-12 bg-red-100 text-[#E5252A] rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-extrabold text-[#18212B]">
              Life Bridge is Loading
            </h2>
            <p className="text-xs text-[#697586] leading-relaxed">
              An unexpected temporary issue occurred while initializing the application. Click below to refresh your session.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-2.5 bg-[#E5252A] text-white text-xs font-bold rounded-full hover:bg-[#CC1E23] transition-colors shadow-sm"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);

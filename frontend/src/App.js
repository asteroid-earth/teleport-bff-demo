import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useApiData } from './hooks/useApiData';

const ApiDataDisplay = ({ title, data, error, isLoading }) => (
  <div className="api-data-container">
    <h2>{title}</h2>
    {isLoading && <p>Loading data...</p>}
    {error && <p className="error">Error: {error}</p>}
    {data && (
      <pre className="data-display">
        {JSON.stringify(data, null, 2)}
      </pre>
    )}
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="error-boundary">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

function App() {
  const { data: mainApiData, error: mainApiError, isLoading: isMainLoading } = useApiData(
    `https://api.teleport-16-ent.asteroid.earth/api/data`
  );

  return (
    <div className="App">
      <h1>Teleport BFF Demo</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ApiDataDisplay
          title="Main API Data"
          data={mainApiData}
          error={mainApiError}
          isLoading={isMainLoading}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
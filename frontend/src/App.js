import React, { useState } from 'react';
import { useApiData } from './hooks/useApiData';
import { Shield, Cookie, Zap, Globe } from 'lucide-react';


// Add environment variable validation
const ENV = {
  MAIN_API_URL: "https://api.teleport-17-ent.asteroid.earth/api/data",
  ANALYTICS_API_URL: "https://analyticsapi.teleport-17-ent.asteroid.earth/analytics/data"
};

// Validate required environment variables
const validateEnv = () => {
  const missing = Object.entries(ENV).filter(([_, value]) => !value);
  if (missing.length > 0) {
    return `Missing required environment variables: ${missing.map(([key]) => key).join(', ')}`;
  }
  return null;
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
  header: {
    marginBottom: '32px',
    borderBottom: '1px solid #eee',
    paddingBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#111',
    marginBottom: '16px',
  },
  subtitle: {
    color: '#666',
    fontSize: '16px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  featureCard: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #eee',
    transition: 'all 0.2s ease',
  },
  featureCardActive: {
    backgroundColor: '#f0f7ff',
    borderColor: '#0066cc',
  },
  featureIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    color: '#0066cc',
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '32px',
  },
  dataSection: {
    backgroundColor: 'white',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '24px',
  },
  dataHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  dataTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#111',
  },
  code: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.45',
    overflowX: 'auto',
  },
  endpoint: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500',
  },
  successBadge: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  errorBadge: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  detail: {
    fontSize: '14px',
    color: '#666',
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginTop: '8px',
  },
  cookieFlow: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '32px',
  },
  cookieVisual: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
  },
  domain: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #ddd',
    minWidth: '200px',
    textAlign: 'center',
  },
  cookieTransfer: {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    gap: '8px',
    fontSize: '14px',
  },
  activeCookie: {
    animation: 'pulse 2s infinite',
  },
  cookieDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
  },
  cookieBox: {
    padding: '12px',
    backgroundColor: '#f0f7ff',
    borderRadius: '4px',
    border: '1px solid #cce5ff',
  }
};

const Feature = ({ icon: Icon, title, description, active }) => (
  <div style={{
    ...styles.featureCard,
    ...(active ? styles.featureCardActive : {})
  }}>
    <div style={styles.featureIcon}>
      <Icon size={20} />
      <span style={{ fontWeight: '500' }}>{title}</span>
    </div>
    <div style={styles.featureDesc}>{description}</div>
  </div>
);

const ApiSection = ({ title, endpoint, data, error, isLoading, onMouseEnter, onMouseLeave }) => {
  const getBadgeStyle = () => {
    if (error) return { ...styles.badge, ...styles.errorBadge };
    if (data) return { ...styles.badge, ...styles.successBadge };
    return styles.badge;
  };

  const getStatusText = () => {
    if (isLoading) return 'Loading...';
    if (error) return 'CORS Error';
    if (data) return 'CORS Enabled';
    return 'Checking...';
  };

  return (
    <section 
      style={styles.dataSection}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={styles.dataHeader}>
        <h2 style={styles.dataTitle}>{title}</h2>
        <div style={getBadgeStyle()}>
          <Shield size={14} />
          {getStatusText()}
        </div>
      </div>
      <div style={styles.endpoint}>
        <Globe size={14} />
        {endpoint}
      </div>
      {data && (
        <pre style={styles.code}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      {error && (
        <div style={styles.detail}>
          Error details: {error}
        </div>
      )}
    </section>
  );
};

function App() {
  const [activeFeature, setActiveFeature] = useState(null);

  const { data: mainData, error: mainError, isLoading: mainLoading } = useApiData(
    ENV.MAIN_API_URL
  );
  
  const { data: analyticsData, error: analyticsError, isLoading: analyticsLoading } = useApiData(
    ENV.ANALYTICS_API_URL
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Teleport BFF Demo</h1>
        <p style={styles.subtitle}>
          Demonstrating cross-domain API integration with Teleport's Backend for Frontend pattern
        </p>
      </header>

      <div style={styles.features}>
        <Feature
          icon={Shield}
          title="CORS Support"
          description="Automatically handles cross-origin resource sharing between multiple domains"
          active={activeFeature === 'cors'}
        />
        <Feature
          icon={Cookie}
          title="Cookie Handling"
          description="Maintains authentication state across different domain boundaries"
          active={activeFeature === 'cookies'}
        />
        <Feature
          icon={Zap}
          title="API Prefetching"
          description="Improves performance by prefetching API data before it's needed"
          active={activeFeature === 'prefetch'}
        />
      </div>

      <div style={styles.grid}>
        <ApiSection
          title="Main API"
          endpoint={ENV.MAIN_API_URL}
          data={mainData}
          error={mainError}
          isLoading={mainLoading}
          onMouseEnter={() => setActiveFeature('cors')}
          onMouseLeave={() => setActiveFeature(null)}
        />
        <ApiSection
          title="Analytics API"
          endpoint={ENV.ANALYTICS_API_URL}
          data={analyticsData}
          error={analyticsError}
          isLoading={analyticsLoading}
          onMouseEnter={() => setActiveFeature('cors')}
          onMouseLeave={() => setActiveFeature(null)}
        />
      </div>
    </div>
  );
}

export default App;
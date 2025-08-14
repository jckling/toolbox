import { useState } from 'react';
import './App.css'
import CircularArrangement from './components/CircularArrangement'
import TableEditor from './components/TableEditor'

function App() {
  const [activeTab, setActiveTab] = useState<'diagram' | 'table'>('diagram');

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '20px',
        paddingBottom: '20px'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          fontWeight: 600,
          margin: 0
        }}>
          {activeTab === 'diagram' ? '连线图生成器' : '印象表生成器'}
        </h1>
        
        {/* Navigation Menu */}
        <nav style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <button
            onClick={() => setActiveTab('diagram')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'diagram' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'diagram' ? 'white' : '#333333',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: activeTab === 'diagram' ? 'bold' : 'normal'
            }}
          >
            连线图生成器
          </button>
          <button
            onClick={() => setActiveTab('table')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'table' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'table' ? 'white' : '#333333',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: activeTab === 'table' ? 'bold' : 'normal'
            }}
          >
            印象表生成器
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'diagram' ? <CircularArrangement /> : <TableEditor />}
      </main>
    </div>
  )
}

export default App
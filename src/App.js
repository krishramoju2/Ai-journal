import React from 'react';
import JournalForm from './JournalForm';
import JournalTimeline from './JournalTimeline';

const App = () => (
  <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
    <h1>AI Journal App</h1>
    <JournalForm />
    <hr />
    <JournalTimeline />
  </div>
);

export default App;

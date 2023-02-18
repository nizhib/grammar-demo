import { Flowbite } from 'flowbite-react';

import Footer from './Footer';
import Grammarify from './Grammarify';
import Header from './Header';

function App() {
  return (
    <Flowbite>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-800">
        <Header />
        <main className="flex grow">
          <Grammarify />
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default App;

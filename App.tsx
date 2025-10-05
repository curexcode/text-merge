import React, { useState } from 'react';

const App: React.FC = () => {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');

  const mergedText = `${text1} - ${text2}`;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Text Merger
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Combine text from two sources into one. Your changes are merged in real-time.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="box1" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Source 1
            </label>
            <textarea
              id="box1"
              rows={10}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter first piece of text..."
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="box2" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Source 2
            </label>
            <textarea
              id="box2"
              rows={10}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter second piece of text..."
            />
          </div>
        </section>

        <section className="space-y-2">
          <label htmlFor="mergedBox" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Merged Result
          </label>
          <textarea
            id="mergedBox"
            rows={10}
            value={mergedText}
            readOnly
            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none cursor-not-allowed"
            placeholder="Merged text will appear here..."
          />
        </section>
      </div>
    </main>
  );
};

export default App;
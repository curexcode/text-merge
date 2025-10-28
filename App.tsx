import React, { useState, useMemo, useEffect } from 'react';

const App: React.FC = () => {
  const [text1, setText1] = useState<string>(() => {
    try {
      return localStorage.getItem('textMerger-text1') || '';
    } catch (e) {
      console.error('Failed to read text1 from localStorage', e);
      return '';
    }
  });
  const [text2, setText2] = useState<string>(() => {
    try {
      return localStorage.getItem('textMerger-text2') || '';
    } catch (e) {
      console.error('Failed to read text2 from localStorage', e);
      return '';
    }
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('textMerger-text1', text1);
    } catch (e) {
      console.error('Failed to save text1 to localStorage', e);
    }
  }, [text1]);

  useEffect(() => {
    try {
      localStorage.setItem('textMerger-text2', text2);
    } catch (e) {
      console.error('Failed to save text2 to localStorage', e);
    }
  }, [text2]);

  const mergedText = useMemo(() => {
    if (!text1 && !text2) {
      return '';
    }

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);

    const mergedLines = Array.from({ length: maxLength }, (_, i) => {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      // If both corresponding lines are empty, the merged line is also empty.
      if (!line1 && !line2) {
        return '';
      }
      
      return `${line1} - ${line2}`;
    });

    return mergedLines.join('\n');
  }, [text1, text2]);

  const handleCopy = async () => {
    if (!mergedText) return;
    try {
      await navigator.clipboard.writeText(mergedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally, show an error message to the user
    }
  };
  
  const handleClear = () => {
    try {
        localStorage.removeItem('textMerger-text1');
        localStorage.removeItem('textMerger-text2');
    } catch (e) {
        console.error('Failed to clear localStorage', e);
    }
    setText1('');
    setText2('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Text Merger
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Combine text from two sources into one. Your changes are saved automatically.
          </p>
        </header>
        
        <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-red-500 transition-colors"
              aria-label="Clear all text and stored data"
            >
              Clear Data
            </button>
        </div>

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
              aria-label="Source 1 Text Input"
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
              aria-label="Source 2 Text Input"
            />
          </div>
        </section>

        <section className="space-y-2">
          <label htmlFor="mergedBox" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Merged Result
          </label>
          <div className="relative">
            <textarea
              id="mergedBox"
              rows={10}
              value={mergedText}
              readOnly
              className="w-full p-4 pr-14 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none cursor-not-allowed"
              placeholder="Merged text will appear here..."
              aria-label="Merged Result Text"
            />
            <button
              onClick={handleCopy}
              disabled={!mergedText}
              className="absolute top-3 right-3 p-2 rounded-md bg-white/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Copy merged text to clipboard"
            >
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;

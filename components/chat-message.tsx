'use client';

import { useCompletion } from '@ai-sdk/react';

export default function ChatMessage() {
  const { input, completion, stop, isLoading, handleSubmit, handleInputChange } =
    useCompletion();

  return (
    <div>
      {isLoading && (
        <button type="button" onClick={() => stop()}>
          Stop
        </button>
      )}

      {completion}
      
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} className='overflow-y-hidden' />
      </form>
    </div>
  );
}
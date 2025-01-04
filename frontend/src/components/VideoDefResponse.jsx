import React, { useState, useEffect } from 'react'

const VideoDefResponseComponent = ({ response, input }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const [isGenerated, setIsGenerated] = useState(false) // Track if text is fully generated
  const [isCopied, setIsCopied] = useState(false) // Track if text is copied
  const speed = 11 // Speed of typing

  useEffect(() => {
    if (!response.transcriptT || response.transcriptT === '') {
      setDisplayedText('Try another video, it seems like a YouTube video or wrong format.')
      setIsGenerated(true) // Mark text as generated in this case too
    } else if (index < response.transcriptT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + response.transcriptT.charAt(index))
        setIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout) // Clean up the timeout
    } else if (index === response.transcriptT.length) {
      setIsGenerated(true) // Mark as fully generated
    }
  }, [index, response.transcriptT])

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(displayedText)
      .then(() => {
        setIsCopied(true) // Mark that the text has been copied
      })
      .catch((err) => {
        console.error('Could not copy text: ', err)
      })
  }

  return (
    <div className="relative w-full">
      {/* Copy Button */}
      {isGenerated && (
        <button
          className="absolute -top-8 right-2 bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={copyToClipboard}
        >
          {isCopied ? 'Copied!' : 'Copy Text'}
        </button>
      )}

      {/* Textarea with Typing Effect */}
      <textarea
        className="w-full h-64 p-4 bg-white rounded-lg border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-mono"
        value={displayedText}
        readOnly
      />

      {/* Optional: Message while text is generating */}
      {!isGenerated && <p className="text-gray-500 mt-2">Generating text...</p>}
    </div>
  )
}

export default VideoDefResponseComponent

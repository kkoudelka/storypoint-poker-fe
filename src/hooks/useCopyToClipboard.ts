import { useState, useRef } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard({ timeout = 2500 }: { timeout?: number }) {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [showCopied, setShowCopied] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setShowCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopiedText(null);
        setShowCopied(false);
      }, timeout);

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy, showCopied };
}

export default useCopyToClipboard;

import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "./ui/button";

export const CopyButton = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    if (!value || isCopied) return;

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

// Adding PropTypes validation
CopyButton.propTypes = {
  value: PropTypes.string.isRequired,
};

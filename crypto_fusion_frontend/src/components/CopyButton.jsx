import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "./ui/button";

export const CopyButton = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

// Adding PropTypes validation
CopyButton.propTypes = {
  value: PropTypes.string.isRequired,
};

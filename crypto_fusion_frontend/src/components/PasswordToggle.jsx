import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";

const PasswordToggle = ({ isVisible, toggleVisibility, className = "" }) => {
  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className={`absolute inset-y-0 right-3 flex items-center text-white focus:outline-none ${className}`}
      tabIndex={-1}
    >
      {isVisible ? (
        // Eye icon
        <Eye className="h-5 w-5"/>
      ) : (
        // Eye-off icon
        <EyeOff className="h-5 w-5"/>
      )}
    </button>
  );
};

PasswordToggle.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PasswordToggle;

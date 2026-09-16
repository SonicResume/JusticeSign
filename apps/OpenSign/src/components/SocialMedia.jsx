import React from "react";

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-3">
      <a
        href="https://justiceoncall.ca"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Justice On Call"
        title="Justice On Call"
        className="btn btn-ghost btn-sm btn-circle"
      >
        <i className="fa-light fa-scale-balanced text-lg" aria-hidden="true"></i>
      </a>

      <a
        href="https://justiceoncall.ca/services/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Justice On Call Services"
        title="Services"
        className="btn btn-ghost btn-sm btn-circle"
      >
        <i className="fa-light fa-briefcase text-lg" aria-hidden="true"></i>
      </a>

      <a
        href="https://justiceoncall.ca/contact/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Justice On Call"
        title="Contact"
        className="btn btn-ghost btn-sm btn-circle"
      >
        <i className="fa-light fa-envelope text-lg" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default SocialMedia;


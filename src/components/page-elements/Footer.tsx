import React from 'react'
import "./Footer.css";

export default function Footer() {
  const logo = "@kbpfuckingbot";
  const reactReference = "Powered by React";
  const nodejsReference = "Node.js backend"

  return (
    <footer className="footer bg-primary text-light d-flex align-items-center">
      <div className="container">
        <div className="row ">
          <div className="col">{logo}</div>
          <div className="col">{reactReference}</div>
          <div className="col">{nodejsReference}</div>
        </div>
      </div>
    </footer>
  )
}

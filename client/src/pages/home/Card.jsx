import React from "react";
import "./card.scss";

const Card = ({ title, content, icon }) => {
  return (
    <div className="card">
      <div className="cardIcon">{icon}</div>
      <div className="cardTitle">{title}</div>
      <div className="cardContent">{content}</div>
    </div>
  );
};

export default Card;

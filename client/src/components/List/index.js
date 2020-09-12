import React from "react";
// import "./style.css";

function ListItems(props) {
  console.log(props)
  return (
    <li key={props.name} className="list-group-item">
      <span><img alt="logo" src={props.logo} className="img-fluid" /></span>
      <span> {props.category} </span>
      <span> {props.name} </span>
      <span> {props.size} </span>
      <span> {props.price} </span>
      <span> {props.rating} </span>
    </li>
  );
}

export default ListItems;

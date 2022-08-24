import { TextField } from "@mui/material";
import React from "react";

const employe = {
    nom: "asédlkf",
    prenom: "asédlkfj",
    age: 15
};

const Contact = () => {

  const [employe, setEmploye] = React.useState({
    nom: "asédlkf",
    prenom: "asédlkfj",
    age: 15
});

  const handleChange = (event) => {
    setEmploye({
        nom: event.target.value,
        prenom: employe.prenom,
        age: employe.age});
  };
    return (
    <div>
        <h1>Contact Me {employe.nom} </h1>        
        <TextField
          id="outlined-password-input"
          label="test"
          value={employe.nom}
          type="text"
          onChange={(handleChange)}
        />
    </div>
    )
};

export default Contact;
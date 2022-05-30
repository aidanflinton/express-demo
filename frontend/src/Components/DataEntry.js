import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState} from "react";
import axios from 'axios'

import Grid from '@mui/material/Grid';

const DataEntry = () => {

    const post = (post) => {
        axios.post('http://localhost:9000/demo/post', {
            name: post.name,
            msg: post.msg
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    }

    const defaultValues = {
        name: "",
        msg: "",
    };

  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    post(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            size="small"
            id="name-input"
            name="name"
            label="User name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            size="small"
            id="msg-input"
            name="msg"
            label="Message"
            type="text"
            value={formValues.msg}
            onChange={handleInputChange}
          />
            <Button variant="contained" color="primary" type="submit">
            Add Event
            </Button>
        </Grid>
        
      </Grid>
    </form>
  );
}

export default DataEntry;

import * as React from 'react';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import '../App.css';

function DataDisplay (props) {
    const like = (id) => {
        axios.post('http://localhost:9000/demo/like', {
            id:id
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    }       

    const del = (docId) => {
        axios.delete('http://localhost:9000/demo/delete/?id=' + docId)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    }

    return(
        <>
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
            >
           {props.messages.map((message)=> 
                    <Grid item xs={12} sm={6} md={3} key={props.messages.indexOf(message)}>

                    <Card sx={{ minWidth: 275, maxWidth: 345}}>
                        <CardHeader 
                            title={message.user}
                            subheader={message.likes}
                        />
                        <CardContent>
                            <Typography variant="body">
                                {message.message}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => del(message.doc_id)} aria-label="share">
                                <DeleteOutlineIcon />
                            </IconButton>
                            <IconButton onClick={() => like(message.doc_id)} aria-label="share">
                                <ThumbUpOffAltIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                    </Grid>
            )}
           </Grid>
        </>
    );
}

export default DataDisplay;
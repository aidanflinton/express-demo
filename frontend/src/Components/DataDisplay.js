import * as React from 'react';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import '../App.css';

function DataDisplay (props) {

    //Card Expansion Stuff
    const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    //Likes
    const like = (id) => {
        axios.put('http://localhost:9000/demo/like', {
            id:id
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    }       

    //Deletion
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
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {message.user.substring(0,1)}
                            </Avatar>
                            }
                            title={"Username: "+message.user}
                            subheader={"Likes: "+message.likes}
                        />
                        <CardActions disableSpacing>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => del(message.doc_id)} aria-label="share">
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Like">
                            <IconButton onClick={() => like(message.doc_id)} aria-label="share">
                                <ThumbUpOffAltIcon />
                            </IconButton>
                        </Tooltip>
                        <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>Message:</Typography>
                        <Typography paragraph>
                            {message.message}
                        </Typography>
                        </CardContent>
                    </Collapse>
                    </Card>
                    </Grid>
            )}
           </Grid>
        </>
    );
}

export default DataDisplay;
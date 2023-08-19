import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { CONSTANTS } from '../utils/constants';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import './Detailspage.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    detailsContainer:{
      marginTop:'10px'
    },
    image: {
      width: 200,
      height: 300,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
 const {IMAGE_API}=CONSTANTS 

function Detailspage(){
    const classes = useStyles();
   const details = useSelector(state=>state.details.details);
   console.log(details);
   
    return (<>
        <Grid container spacing={2} className={classes.detailsContainer}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={`${IMAGE_API}${details?.poster_path}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h3">
                  {details?.original_title}
                </Typography>
                <Typography variant="p" gutterBottom>
                  
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </>)
}

export default Detailspage;
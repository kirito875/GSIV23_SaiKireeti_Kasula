import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { CONSTANTS } from '../utils/constants';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import './Detailspage.css'
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    detailsContainer:{
      marginTop:'10px'
    },
    image: {
      width: 240,
      height: '100%',
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    rating:{
        color:'#DFDFDF',
        fontSize:'24px'
    },cast:{
        display:'block',
        marginTop:'8px'
    }
  }));
 const {IMAGE_API,API_KEY}=CONSTANTS 

function Detailspage(){
    const classes = useStyles();
    const id = useSelector(state=>state.details.details);
    const [details,setDetails]=useState([]);
    const [year,setYear]=useState(new Date());
    const [crew,setCrew]=useState([]);
    const [cast,setCast]=useState([{name:''}]);
    const getMovieCast=async()=>{
     try{
      const response = await fetch(` https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`);
      const data = await response.json();
      setDetails(data);
      const date=new Date(data.release_date);
      setYear(date.getFullYear());
      setCrew(data.credits.crew);
      setCast(data.credits.cast);
     }
     catch(err){

     }
    }
    useEffect(()=>{
        getMovieCast();

    },[]);
    
   
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
                <Typography variant='span'className={classes.rating}>
                    {`  (${details?.vote_average})`}
                </Typography>
                </Typography>
                <Typography variant="div">
                   {`${year} | ${details?.runtime} min | ${crew?.filter((val)=>val.job==='Director')[0]?.name}`}
                </Typography>
                <Typography variant="div" className={classes.cast}>
                 Cast: {cast.length>0?cast?.map((val,index)=>{if(index===0){return `${val?.name}`}else{return `, ${val?.name}`}}):''} 
                </Typography>
                <Typography variant="div" className={classes.cast}>
                Description: {details?.overview}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </>)
}

export default Detailspage;
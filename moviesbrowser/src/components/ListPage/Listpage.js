import { useEffect, useState } from 'react';
import { CONSTANTS } from '../utils/constants';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetails, searchList } from '../store/store';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from "@material-ui/core/GridList";
import './Listpage.css'
import { useNavigate } from 'react-router-dom';

const {API_KEY,IMAGE_API}=CONSTANTS;
const useStyles = makeStyles({
    root: {
      width: 280,
      margin:'10px 10px 10px 10px'
    },
    media: {
      height: 400,
    },
    movieHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    movieRating:{
     color:'#DFDFDF'
    },
    movieDescription:{
         maxWidth: '100%',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
  });

function Customcard({movietitle,movieDescription,movieRating,movieImagePath,handleMovieClick}){
    const classes = useStyles();
    return(<Card className={classes.root}>
        <CardActionArea onClick={handleMovieClick}>
          <CardMedia
            className={classes.media}
            image={`${IMAGE_API}${movieImagePath}`}
            title="Contemplative Reptile"
          />
          <CardContent>
           <Typography component="div" className={classes.movieHeader}> 
            <Typography gutterBottom  component="div" >
              {movietitle}
            </Typography>
            <Typography gutterBottom  component="div" className={classes.movieRating}>
              {`(${movieRating})`}
            </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.movieDescription}>
              {movieDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>)
}  

function Listpage(){
   const [movieList,setMovieList]=useState([]);
   const [page, setPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const searchResult = useSelector(state=>state.search.searchResults);
   const details=useSelector(state=>state.details.details);
   const navigate=useNavigate();
   const dispatch=useDispatch();

   const [error, setError] = useState(null);
  
    const getMoviesList = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${page}&api_key=${API_KEY}`);
          const data = await response.json();
          setMovieList(movies => [...movies, ...data.results]);
          setPage(page + 1);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

    const handleScroll = () => {
        
        if((Math.ceil(window.scrollY + window.innerHeight) >= 
            document.documentElement.scrollHeight)&&searchResult.length===0){
            getMoviesList();
            }
        
      };
      
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoading]); 
      
      useEffect(()=>{
      getMoviesList();
      },[]);

       useEffect(()=>{
       if(searchResult.length>0){
        setMovieList(searchResult);
       }
       else{
        setPage(1);
        setMovieList([]);
        getMoviesList();
       }
      },[searchResult]);

 const handleMovieClick=(value)=>{
   dispatch(movieDetails(value));
   navigate('/detailspage');
 }


    return(<div className='movie-view'>
     
     <GridList spacing={0}>
      {movieList?.map((value)=>(<Customcard movietitle={value.original_title} movieDescription={value.overview} movieRating={value.vote_average} movieImagePath={value.poster_path} handleMovieClick={()=>{handleMovieClick(value)}}/>))}
      </GridList>
      {isLoading && <p>Loading...</p>}
      
    </div>)
}

export default Listpage;
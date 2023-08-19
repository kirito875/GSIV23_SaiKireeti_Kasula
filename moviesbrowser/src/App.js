import {  Route, Routes,Navigate,useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { searchList } from "./components/store/store";
import { CONSTANTS } from "./components/utils/constants";
import Detailspage from "./components/DetailsPage/Detailspage";
import { AppBar,IconButton,Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';
import Listpage from "./components/ListPage/Listpage";


const {API_KEY}=CONSTANTS
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#DFDFDF',
    color:'#9B9B9B',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '50%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#9B9B9B'
  },
  inputRoot: {
    color: '#9B9B9B',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    color:'#9B9B9B'
  },
  navigationBar:{
    backgroundColor:'white'
  },
  homeIcon:{
    marginLeft:'auto'
  },
  toolBarMargin:{
    ...theme.mixins.toolbar
  },movieDetails:{
    color:'#4A4A4A',
    fontSize:'24px'
  }

 
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
function App() {
  const classes = useStyles();
  const searchResult = useSelector(state=>state.searchResults);
  const dispatch =useDispatch();
  let location=useLocation();
  
  const getSearchResults=async(value)=>{
    try{
      const response=await fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`);
      const data = await response.json();
      dispatch(searchList(data.results));
    }
    catch(err){

    }
  }
  const searchQuery=(event)=>{
   getSearchResults(event.target.value);
  }
  

  return (
    <>
    
    <AppBar>
      <Toolbar className={classes.navigationBar}>
     {location?.pathname==='/listpage'&&
      <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={searchQuery}
            />
        </div>
    }
    {
      location?.pathname==='/detailspage'&&<div className={classes.movieDetails}>
        Movie Details
      </div>
    }
        <IconButton className={classes.homeIcon}>
          <HomeIcon style={{color:'#4A4A4A'}} />
        </IconButton>

      </Toolbar>
    </AppBar>
    <div className={classes.toolBarMargin}/>

    <Routes>
    <Route path="*"  element={ <Navigate to="/listpage" />}/>
      <Route path="/listpage" Component={Listpage}/>
      <Route path="/detailspage" Component={Detailspage}/>
    </Routes>
  
    
    </>
  );
}

export default App;

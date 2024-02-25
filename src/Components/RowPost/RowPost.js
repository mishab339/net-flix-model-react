import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube';
import './RowPost.css'
import axios from '../../axios'
import {imgageUrl,API_KEY} from '../../constants/constants'
function RowPost(props) {
  const [movie,setMovie] = useState([]);
  const [urlId,setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovie(response.data.results)
      console.log(response.data);
    }).catch((err)=>{
      alert('network err');
    })
  },[]);
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    }
  };
  const handleMovie=(id)=>{
     console.log(id);
     axios.get(`movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then((response)=>{
      console.log(response.data);
      if(response.data.results.length !== 0){
        setUrlId(response.data.results[0]);
      }else{
        console.log('Array is empty...');
      }
     })
  }
  return (
    <div className='row'>
        <h1>{props.title}</h1>
      <div className='posters'>
         {movie.map((obj)=>
         <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${imgageUrl+obj.backdrop_path}`} alt="" />
         )
         }
        </div>
       {urlId && <YouTube videoId={urlId.key} opts={opts}/>}
    </div>
  )
}

export default RowPost

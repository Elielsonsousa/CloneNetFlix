
// eslint-disable-next-line 
import React,{useEffect,useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './componets/MovieRow';
import './App.css';
import FeaturedMovie from './componets/FeaturedMovie';
import Header from './componets/Header';


export default () => {
const [movieList,setMovieList] = useState([]);
const [featuredData, setFeaturedData] = useState(null);
const [blackHeader, setBlackHeader] = useState(false)


useEffect(()=>{
    const loadAll = async () => {
        //peganod a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

        //pegando a lista
       /* let originals = list.filter(i=>i.slug === 'originals');
        let ramdomChoosen = Math.floor(Math.random() * (originals[0].items.results.lenght -1));
        let chosen = originals[0].items.results[ramdomChoosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
     setFeaturedData(chosenInfo)*/
     let originals = list.filter(i=> i.slug === 'originals');
     let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     let chosen = originals[0].items.results[randonChosen]
     let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
     setFeaturedData(chosenInfo);
     console.log(chosenInfo)
        }
        loadAll();
    },[]);

    useEffect(()=>{ //esse gancho controla se é ou n pra mostrar a const 'blackHeader' de acordo com o scroll da page
        const scrollListener=( )=>{
            if(window.scrollY > 10){
                setBlackHeader(true)
            }else{
                setBlackHeader(false)
            }
        }
        window.addEventListener('scroll',scrollListener);

        return()=>{
            window.removeEventListener('scroll',scrollListener);
        }
    },[])

return(
    <div className="page">

        <Header black={blackHeader} />

        {featuredData &&
            <FeaturedMovie item={featuredData} />
        }
      

       <section className="lists">
           {movieList.map((item,key) => (    
               <MovieRow key={key} title={item.title} items={item.items} ></MovieRow>         
           ))}
       </section>
       <footer>
           Feito por: <span className='name'>Elielson Sousa</span> <br/>
           Direitos de imagens para Netflix <br/>
           Dados pego através do site: Themovideo.org
       </footer>
       {movieList.length <= 0 && //se n tiver filmes na lista ent aparecce o gif/tela de loading
            <div className='loading'>
                <img src='https://tenor.com/view/netflix-loading-gif-6089689' alt='Carregando' />
            </div>
       }
      
    </div>
);
    
}
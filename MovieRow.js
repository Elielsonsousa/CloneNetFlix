/* eslint-disable import/no-anonymous-default-export */
import React,{useState} from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {
    const [ scrollX, setScrollX] = useState(-400)

    const handleLeftArrow  = () =>{ //aqui manipula a rolagem nos scroll dos filmes
        let x = scrollX + Math.round(window.innerWidth / 2); //aqui pega a metade do tamanho da tela p rolar de acordo com ela
        if( x > 0){ //se x for maior que 0 então x vai ser zero(limita à zero)
            x = 0
        }
        setScrollX(x)
    };

    const handRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) -60
        }
        setScrollX(x)
    };
   
    return(
        <div className="movieRow">
           <h2>{title}</h2>

           <div className='movierow--left' onClick={handleLeftArrow}>
               <NavigateBeforeIcon style={{fontSize:50}}/>
           </div>
           <div className='movierow--rigth' onClick={handRightArrow}>
               <NavigateNextIcon style={{fontSize:50}}/>
           </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                    }}>
                {items.results.length > 0 && items.results.map((item, key)=>( 
                    <div key={key} className='movieRow--item'>
                          <img  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} /> 
                    </div>    
                                         
                    ))}
                </div>
           
            </div>
        </div>
    );
}
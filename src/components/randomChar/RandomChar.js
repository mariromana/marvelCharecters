import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';


const RandomChar = () => {

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [char, setChar] = useState({});
    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    //     // name: null,
    //     // description: null,
    //     // thumbnail: null,
    //     // homepage: null,
    //     // wiki: null
    // }
    const {loading, error, getCharacter, clearError} = useMarvelService();
    // const marvelService = new MarvelService(); 

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        
        }
    }, [])
    // componentDidMount () {
    //     this.updateChar();
    //     // this.timerId = setInterval(this.updateChar, 3000);
    
    // }

    // componentWillUnmount () {
    //     clearInterval(this.timerId);
        
    // }

    

    const onCharLoaded = (char) => {
        setChar(char);
    }



    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            
        
    }

   
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateChar}>

                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
  
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }


    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">Homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )

}
export default RandomChar;
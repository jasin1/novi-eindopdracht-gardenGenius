import './PlantCard.css';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import placeholderImage from '../../assets/placeholder-plant.jpg';
import LikeButton from "../LikeButton/LikeButton.jsx";
import {PlantContext} from '../../context/PlantContext.jsx';
import {AuthContext} from "../../context/AuthContext.jsx";


function PlantCard({plantName, subName, image, id}) {

    const {likePlant, unlikedPlant} = useContext(PlantContext);
    const {Info} = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {

        const userPlantIds = Info || [];
        setIsLiked(userPlantIds.includes(id));
    }, [Info, id]);

    // const isLiked = userPlantIds.includes(id);

    // const {likedPlantIds, likePlant, unlikedPlant} = useContext(PlantContext);
    // const isLiked = likedPlantIds.includes(id);


    const handleLikeClick = () => {
        if (!isLiked) {
            likePlant(id);
            console.log("Like button clicked!")
        } else {
            unlikedPlant(id);
            console.log("Plant is unliked");
        }
        setIsLiked(!isLiked);
    }


    return (
        <div className="card-wrapper">
            <div className="plant-save">
                <LikeButton isLiked={isLiked} onClick={handleLikeClick}/>
            </div>
            <Link to={`/plantdetail/${id}`} className="card-link">
                <div className="card" key={id}>
                    <div className="card-img-wrapper">
                        {image ? (
                            <img src={image} alt=""/>
                        ) : (
                            <img src={placeholderImage} alt="placeholder"/>
                        )}
                    </div>
                    <div className="card-description">
                        <div className="plant-title">
                            <h3>
                                {plantName ? plantName : 'No available plant name'}
                            </h3>

                            <p>
                                {subName ? subName : 'No available sub name'}
                            </p>
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );

}


export default PlantCard;
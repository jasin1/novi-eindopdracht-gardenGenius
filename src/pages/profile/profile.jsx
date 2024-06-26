import './profile.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import Hero from "../../assets/profile-hero.jpg";
import Footer from "../../components/Footer/Footer.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext, useState, useEffect} from "react";

function Profile() {

    const { user } = useContext(AuthContext);
    const [numSavedPlants, setNumSavedPlants] = useState(0);

    const userName = user ? user.username : null;
    const userEmail = user ? user.email : null;
    // const userInfo = user ? JSON.parse(user.info) : null;

    // const numSavedPlants = userInfo ? userInfo.length : 0;

    useEffect(() => {
        if(user && user.info){
            const userInfo = JSON.parse(user.info);
            setNumSavedPlants(userInfo.length);
        }else{
            setNumSavedPlants(0);
        }

    }, [user]);




    console.log("user object: ", user);
    console.log("username is ", userName);
    console.log("user email", userEmail);
    // console.log("user info ", userInfo);
    // console.log("length plants array", LikedPlantIds.length);


    return (
        <main>
            <article>
                <Navigation/>
                <header className="hero">
                    <img src={Hero} alt="Hero image for the profile page"/>
                </header>
                <section className="suggested">
                    <div className="block-top">
                        <div className="heading-block">
                            {userName ?(
                                <h1>Welcome, {userName}!</h1>
                            ): (
                                <h1>Please log in to view your profile</h1>
                            )}
                            <h2>Your Email adres is <span className="coloredTxt">{userEmail}</span> </h2>
                            <h2>Number of Saved Plants is <span className="coloredTxt">{numSavedPlants}</span></h2>
                        </div>

                    </div>

                </section>
                <Footer/>
            </article>
        </main>
    )
}

export default Profile;

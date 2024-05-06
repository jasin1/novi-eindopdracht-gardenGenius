import {createContext, useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/istokenvalid.js";
import {PlantContext} from './PlantContext.jsx';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const { likedPlantIds } = useContext(PlantContext);

    const [Auth, setAuth] = useState({
        isAuth: false,
        user: {},
        status: 'pending',
    });


    useEffect(()=>{
        const token = localStorage.getItem('token');
        // is de token nog geldig? check met iat helper function

        if(token && isTokenValid(token)){
            void login(token);

        }else {
            console.log('do nothing after checking useEffect for token');
            setAuth({
                isAuth: false,
                user: {},
                status: 'done',
            })
        }
    },[]);

    const navigate = useNavigate();

    async function savePlantsToAPI(username, userInfo) {
        try {
            const response = await axios.put(
                `https://api.datavortex.nl/gardengenius/users/${username}`,
                { info: JSON.stringify(likedPlantIds), userInfo }
            );
            console.log("Plants saved to API:", response.data);
        } catch (error) {
            console.error("Error saving plants to API:", error);
        }
    }

    async function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        console.log('decoded JWT', decodedToken.sub)

        try {
            const response = await axios.get(`https://api.datavortex.nl/gardengenius/users/${decodedToken.sub}`,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            // meesturen van planten
            await savePlantsToAPI(response.data.username, response.data.info);

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    info: response.data.info,
                },
                status: 'done',
            });
            console.log('authContext response ',response);
            navigate('/search');

        } catch (e) {
            console.error('login error: ', e);
            logout();
        }


        console.log('User logged in');
        // navigate('/search');

    }

    function logout() {
        console.log('User logged out');
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        })
        navigate('/');
    }


    const AuthData = {
        isAuth: Auth.isAuth,
        login: login,
        logout: logout,
        savePlantsToAPI: savePlantsToAPI,
    };

    return (
        <AuthContext.Provider value={AuthData}>
            {Auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;
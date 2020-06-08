
let userAccessToken;
//module to communitcate with Spotify API
Spotify={
    //method to get get user access token
    getAccessToken(){
        if  (userAccessToken){
            return userAccessToken;
        }
        //ELSE: extract the access token and expire time from the URL obtained
        //window.locattion.href returns current site URL
        const userAccessTokenMatch=window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch=window.location.href.match(/expires_in=([^&]*)/);
        //If access token and expiration time is in the url then set those variables up
        if (userAccessTokenMatch && expiresInMatch){
            userAccessToken=userAccessTokenMatch[1];
            const expiresIn=Number(expiresInMatch[1]);
        }
        
        /*Clear the parameters from the URL, 
        so the app doesn’t try grabbing the access token after it has expired */
        window.setTimeout(() => userAccessToken = '', expiresInMatch* 1000);
        window.history.pushState('Access Token', null, '/');
        return userAccessToken
    }


}
export default Spotify;
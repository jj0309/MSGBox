window.addEventListener('load',()=>{
    const refreshToken=async()=>{
        await fetch('/login/token',
            {
                method:"POST",
                credentials:"same-origin",
            }
        ).catch(e=>{console.log('refresh token error: ',e)})
    }
    refreshToken();
    setInterval(() => {
        refreshToken();
    }, 250000);
})
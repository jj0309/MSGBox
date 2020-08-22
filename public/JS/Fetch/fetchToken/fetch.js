window.addEventListener('load',()=>{
    const refreshToken=async()=>{
        await fetch('/login/token',
            {
                method:"POST",
                credentials:"same-origin",
            }
        ).catch(e=>{console.log('refresh token error: ',e)})
    }
    setInterval(() => {
        refreshToken();
    }, 5000);
})
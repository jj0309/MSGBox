# MSGBox

A messaging web app sort of like discord.

The application has been deployed: https://msgbox-app.herokuapp.com/

- Guest account: username: guest | password: aaaAAA111
- Guest2 account: username: guest2 | password: aaaAAA111

# features: 
            - Registration
            - Authentification
            - non-volatile conversation messages (saved in DB)
            - private 1 on 1 conversation
            - custom profile
            - Able to search and send conversation requests
            - Friendlist (conversation list)


# Upcoming features/TODO: 
                          -volatile conversations (not-saved in DB, everything is deleted after the user leaves the converstion page)
                          -group conversation
                          -voice calls
                          
# Alpha 0.3 (8/30/2020):
- added user pannel customization
*KNOWN ISSUES*
- Users profile pics are not shown => because saved files are not persistant on heroku servers

# Alpha 0.2 (8/23/2020):

*KNOWN ISSUES*
- Searching for an user that doesn't exist returns a page -> need to return a user not found result
- jwt invalidated after browser closes will return an error page if the user returns to the site.



# Alpha 0.1 (8/19/2020):

![index page](https://github.com/jj0309/portfolio/blob/master/contentData/ProjectImg/msgbox/msg1.png)
![messaging page](https://github.com/jj0309/portfolio/blob/master/contentData/ProjectImg/msgbox/msg3.png)
![User search page](https://github.com/jj0309/portfolio/blob/master/contentData/ProjectImg/msgbox/msg2.png)


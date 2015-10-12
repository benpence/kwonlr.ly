/******** API Functions **********/

/**
 *  home() shows kwons that the currentUser should see
 *  
 *  @database The kwonlr.ly database. See reference below for format
 *  @currentUser The current user. For example, "a_user"
 *  
 *  The output should be a list of Kwons.
 */
function home (database, currentUser) {
    return database.kwons;
};

/**
 *  searchKwons() shows kwons that match the searchTerms
 *  
 *  @database The kwonlr.ly database. See reference below for format
 *  @currentUser The current user. For example, "a_user"
 *  @searchTerms A list of words that the user has searched for. For example, ["cool", "lunch", "box"]
 *  
 *  The output should be a list of Kwons.
 */
function searchKwons (database, currentUser, searchTerms) {
    function kwonContains (kwon, word) {
        return kwon.user.toLowerCase().indexOf(word) > -1
            || kwon.content.toLowerCase().indexOf(word) > -1;
    }

    return database.kwons;
}

/**
 *  messages() shows messages for current user
 *  
 *  @database The kwonlr.ly database. See reference below for format
 *  @currentUser The current user. For example, "a_user"
 *  
 *  The output should be a list of Messages.
 */
function messages (database, currentUser) {
    function isFromCurrentUser (message) {
        return message.from === currentUser;
    }

    function isToCurrentUser (message) {
        return message.to === currentUser;
    }

    return database.messages;
};

/******** Database Reference **********

database = {
    kwons: [
        {
            user: "john_doe_1992",
            content: "I saw a #squirrel today lol. @jane_doe_93 saw it too!",
        },
    ],

    messages: [
        {
            from: "john_doe_1992",
            to: "jane_doe_93",
            content: "The new Star Wars movies were great!",
        },
    ],
}

*/

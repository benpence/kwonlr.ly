var kwon = {};

function Kwon (user, content) {
    this.user = user;
    this.content = content;
}

function Message (from, to, content) {
    this.from = from;
    this.to = to;
    this.content = content;
}

kwon.TagRegex = /((?:[@#][a-zA-Z0-9_]+)|(?:[a-zA-Z0-9_]+\.(?:ly|com|ca|org|net|edu|co\.uk)\/[a-zA-Z0-9_\.\/]+))/g;
kwon.formatContent = function (content) {
    return content.replace(kwon.TagRegex, "<a href='#'>$1</a>");
}

kwon.setActive = function (buttonId) {
    $(".active").removeClass("active");
    $("#" + buttonId).addClass("active");
};

kwon.switchContent = function (buttonId, apiFunc, format) {
    kwon.setActive(buttonId);

    var items = apiFunc(kwon.db).map(format);
    
    $("#content").replaceWith(
        $("<div id='content' class='content'></div>").append(items)
    );
};

kwon.showSearch = function () {
    var searchTerms = $("#search")[0].value
        .split(/\s+/)
        .map(function (word) { return word.toLowerCase() });

    kwon.showHome(searchTerms);
}

kwon.showHome = function (searchTerms) {
    // Reuse showHome for search
    if (searchTerms === undefined) {
        var transformKwons = home;
    } else { 
        var transformKwons = function (database, currentUser) {
            return searchKwons(database, currentUser, searchTerms);
        }
    }

    kwon.switchContent("home-button", transformKwons, function (k) {
        return $(
            "<div class='item kwon'> \
              <p class='from'><a href='#'>@<b>" + k.user + "</b></a></p> \
              <p> \
                 <span>" + kwon.formatContent(k.content) + "</span> \
                 <p class='retweet'> \
                   <a href='#'><span class='glyphicon glyphicon-share-alt'></span></a> \
                   <a href='#'><span class='glyphicon glyphicon-retweet'></span></a> \
                   <a href='#'><span class='glyphicon glyphicon-star-empty'></span></a> \
                   <a href='#'><span class='glyphicon glyphicon-option-horizontal'></span></a> \
                 </p> \
            </div>");
    });
};

kwon.showMessages = function () {
    kwon.switchContent("messages-button", messages, function (message) {
        return $(
            "<div class='item message'> \
              <p> \
                <a href='#'><b>@" + message.from + "</b></a> \
                <span class='glyphicon glyphicon-arrow-right'></span> \
                <a href='#'><b>@" + message.to + "</b></a> \
              </p> \
              <p>" + kwon.formatContent(message.content) + "</p> \
              <p class='retweet'> \
                <a href='#'><span class='glyphicon glyphicon-share-alt'></span></a> \
                <a href='#'><span class='glyphicon glyphicon-picture'></span></a> \
              </p> \
            </div>");
    });
};

kwon.showAbout = function () {
    kwon.setActive("about-button");

    $("#content").replaceWith($(" \
      <div id='content' class='content jumbotron'> \
        <h1>kwonlr.ly <span class='glyphicon glyphicon-send'></span></h1> \
        <p class='lead'> \
         There's no better time to start sending kwons to your friends. Talk to \
         anybody, anywhere, <i>instantly</i>, at the speed of kwon!</p> \
        <p><a class='btn btn-lg btn-success' href='#' role='button'>Sign up today</a></p> \
      </div>"));
};

$(document).ready(function() {
    kwon.showAbout();
});

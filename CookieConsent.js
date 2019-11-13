/* jshint ignore:start */
class CookieConsent{
    constructor(cookieName, cookieHeadline, cookieText){
        this.cookieName = cookieName;
        this.cookieHeadline = cookieHeadline ? cookieHeadline : "We use cookies";
        this.cookieText = cookieText ? cookieText : `This site uses cookies. By browsing this site, you are agreeing to our use of cookies. For more information, see our cookie policy`;
    }

    static getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    init(){
        var cookieValue = CookieConsent.getCookie(this.cookieName);

        if(cookieValue == "" || cookieValue != "yes"){
            var body = document.body;
            var consentDiv = document.createElement("div");
            consentDiv.setAttribute("id","cookieNotification");
            
            var cookieHeadline = document.createElement("h1");
            cookieHeadline.setAttribute("id","cookie_headline");
            cookieHeadline.innerText = this.cookieHeadline;

            var cookieText = document.createElement("p");
            cookieText.setAttribute("id","cookie_text");
            cookieText.innerHTML = this.cookieText;

            var okButton = document.createElement("button");
            okButton.innerText = "OK";

            var _this = this;

            okButton.addEventListener("click", function(){
                document.cookie = _this.cookieName+"=yes;path=/";
                document.getElementById("cookieNotification").remove();
            });

            consentDiv.append(cookieHeadline);
            consentDiv.append(cookieText);
            consentDiv.append(okButton);

            body.insertBefore(consentDiv,body.firstChild);

            CookieConsent.addCss();
        }

    }

    static addCss(){
        var styles = `#cookieNotification{
            padding: 1.5rem;
            background: #f2f2f2;
            font-weight: 400;
            line-height: 1.5;
            text-align: left;
            max-width: 100%;
            position: relative;
            top:0;
            right:0;
            left:0;
            bottom: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        #cookieNotification #cookie_headline{
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 18px;
            font-weight: 600;
        }
        
        #cookieNotification #cookie_text{
            font-size: 15px;
        }
        
        #cookieNotification button{
            color: #fff;
            background-color: #008000;
            font-weight: bold;
            font-size: 1rem;
            border-radius: 2px;
            padding: .5rem 1rem;
            outline: none;
            cursor: pointer;
            border: none;
        }`;
        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }
}
// Set language in setting Menu
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    $('#setting_title').text(lang);
}

// Changing language on page 
$(document).ready(function(){
    language = localStorage.getItem('language')
    $('#setting_title').text(language);

    if (language == null){
    	language = "English"
    	localStorage.setItem('language', language);
    }

    $.getJSON('language/'+ language +'.json', function(data){
        var i = 0
        $.each(data, function(key, val){
            $('#text' + i).text(val)
            i = i+1
        })
    })
});


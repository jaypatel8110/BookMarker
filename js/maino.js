// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
	
  
	  var siteName =document.getElementById('siteName').value;   ///getting form values
	  var siteUrl =document.getElementById('siteUrl').value;

	  if(!validateForm(siteName, siteUrl)){ 
		return false;
	  }

	  var bookmark = { //array of bookmark
		name: siteName,
		url: siteUrl
  }

 
  if(localStorage.getItem('bookmarks') === null){  // if its the first value
		
		var bookmarks = [];
		bookmarks.push(bookmark);//will push name and url from above variable
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //springify  , a method to set  in JSON formate
		
			
  } else {
	  
    // Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		
		bookmarks.push(bookmark);//bookmark array is already created when first time is created this part of code runs from second time
		
		
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // Re-set back to localStorage
  }

  
  document.getElementById('myForm').reset(); // Clear form after Submitting

  
  fetchBookmarks(); //to display results

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	  
	for(var i =0;i < bookmarks.length;i++){
		if(bookmarks[i].url == url){
		 
		  bookmarks.splice(i, 1);  //spice for deletion 
    }
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));// Re-set back to localStorage

  
  fetchBookmarks();// Re-fetch bookmarks to get new values
}

// Fetch bookmarks
function fetchBookmarks(){
  
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // Get bookmarks from localStorage
  
  var bookmarksResults = document.getElementById('bookmarksResults');

  
  bookmarksResults.innerHTML = ''; //displaying to div
  
  for(var i = 0; i < bookmarks.length; i++){
	  
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl){
	
		  if(!siteName || !siteUrl){
			alert('Please fill in the form');
			return false;
		  }

	  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	  var regex = new RegExp(expression);

	  if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	  }

  return true;
}
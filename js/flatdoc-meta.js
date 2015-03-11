$(document).on('flatdoc:ready', function() {

  // title from yaml meta
  $("#flat-title").html( mdContent.title );
  // author from yaml meta
  $("#flat-author").html( mdContent.author );
  // date from yaml meta
  $("#flat-date").html( mdContent.date );
  
  // sticky sidebar
  var sticky = new Waypoint.Sticky({
    element: $('#flatdoc-menu')[0]
  })

  // wrap section-tag around heading-element till before next heading 
  // with section-id (plus suffix) from heading-id
  $(function () {
      $('main h1,main h2,main h3').each(function () {
          var headingId =  $(this).attr('id');
          var sectionId = headingId+'-wayp-section-container';
          $(this).nextUntil('main h1, main h2, main h3').add(this).wrapAll('<section id="'+sectionId+'" />');
      });
  });

  $(document).ready(function() {
  
    // Set #subtitle if mdContent.subtitle is there
	  if (mdContent.subtitle !== '') {
		  $("#subtitle").text(mdContent.subtitle);
	  } else {
		  $("#subtitle").remove();
	  }

    // Get section or article by href
    function getRelatedContent(el){
      return $($(el).attr('href'));
    }
    // smooth scrolling
    $('nav a').on('click',function(e){
      e.preventDefault();
      $('html,body').animate({scrollTop:getRelatedContent(this).offset().top - 20})
    });

    // the waypoint thing!
    $('main section').each(function() {
    var waypSectionId;
    var inview = new Waypoint.Inview({
      element: this,
      enter: function(direction) {
        // transform section-id to corresponding nav a href
        waypSectionId = $(this.element).attr('id').replace('-wayp-section-container','');
        $(this.element).toggleClass('inview');
        $('nav#flatdoc-menu a[href=#'+waypSectionId+']').toggleClass('active');
        //console.log('Richtung: '+direction+' \nStatus: enter \nID: '+$(this.element).attr('id'));
      },
      entered: function(direction) {
        // transform section-id to corresponding nav a href
        waypSectionId = $(this.element).attr('id').replace('-wayp-section-container','');
        //console.log('Richtung: '+direction+' \nStatus: entered \nID: '+$(this.element).attr('id'));
      },
      exit: function(direction) {
        // transform section-id to corresponding nav a href
        waypSectionId = $(this.element).attr('id').replace('-wayp-section-container','');
        //console.log('Richtung: '+direction+' \nStatus: exit \nID: '+$(this.element).attr('id'));
      },
      exited: function(direction) {
        // transform section-id to corresponding nav a href
        waypSectionId = $(this.element).attr('id').replace('-wayp-section-container','');
        $(this.element).toggleClass('inview');
        $('nav#flatdoc-menu a[href=#'+waypSectionId+']').toggleClass('active');
        //console.log('Richtung: '+direction+' \nStatus: exited \nID: '+$(this.element).attr('id'));
      }
    })
    })

  }); // end document:ready
}); // end flatdoc:ready

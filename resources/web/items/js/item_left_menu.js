$(document).ready(function () {
  $(".elementor-item.elementor-item-anchor.menu-link.has-submenu").click(
    function (e) {
	  console.log(e);
      const target = $(this).parent().children(".sub-menu.elementor-nav-menu--dropdown");
      $(target).slideToggle();
    }
  );
  
  
   $("#sm-16782790502886694-5").click(
    function (e) {
	  console.log(e);
      const target = $(this).parent().children(".sub-menu.elementor-nav-menu--dropdown");
      $(target).slideToggle();
    }
  );
});

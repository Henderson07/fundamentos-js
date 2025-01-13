$(document).ready(function () {
    let currentIndex = 0;
    const totalImages = $('.gallery img').length;
  
    $('.next').on('click', function () {
        showImage(currentIndex + 1);
    });
  
    $('.prev').on('click', function () {
        showImage(currentIndex - 1);
    });
  
    function showImage(index) {
        if (index >= 0 && index < totalImages) {
            currentIndex = index;
            const translateValue = -index * 100 + '%';
            $('.gallery img').css('transform', 'translateX(' + translateValue + ')');
        }
    }
  });
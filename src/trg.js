// import $ from 'jquery';
// $('#down-img').click(function(){
//     let image = $(this).attr('src')
//     console.log(image);
//     $('#img').attr('src' , image)
// })
// // $('#zoom').imagezoomsl({
// //     zoomrange: [4 , 4]
// // })
// const ZOOM_LEVEL = 2;

// $(document).ready(function() {
//   $(".thumb").mouseenter(enter);
//   $(".thumb").mouseleave(leave);
//   $('.thumb').mousemove(zoom);
// });

// function zoom(event) {
//   const p = calculateZoomOverlay({x: event.pageX, y: event.pageY}, $(event.target));
//   moveCursorOverlay(p.left, p.top);
//   movePreviewBackground(p.offsetX, p.offsetY);
// }

// function calculateZoomOverlay(mouse, thumb) {
//   let t = thumb.position();
//   t.width = thumb.width();
//   t.height = thumb.height();

//   let z = {}; // Zoom overlay
//   z.width = t.width / ZOOM_LEVEL;
//   z.height = t.height / ZOOM_LEVEL;
//   z.top = mouse.y - z.height / 2;
//   z.left = mouse.x - z.width / 2;
  
//   // Bounce off boundary
//   if (z.top < t.top) z.top = t.top;
//   if (z.left < t.left) z.left = t.left;
//   if (z.top + z.height > t.top + t.height) z.top = t.top + t.height - z.height;
//   if (z.left + z.width > t.left + t.width) z.left = t.left + t.width - z.width;

//   z.offsetX = (z.left - t.left) / z.width * 100;
//   z.offsetY = (z.top - t.top) / z.height * 100;

//   return z;
// }

// function moveCursorOverlay(left, top) {
//    $('.cursor-overlay').css({
//     top: top,
//     left: left
//   });
// }

// function movePreviewBackground(offsetX, offsetY) {
//   $('.preview').css({
//     'background-position': offsetX + '% ' + offsetY + '%'
//   });
// }

// function enter() {
//   // Setup preview image
//   const imageUrl = $(this).attr('src');
//   const backgroundWidth = $('.preview').width() * ZOOM_LEVEL;
//   $('.preview').css({
//     'background-image': `url(${imageUrl})`,
//     'background-size': `${backgroundWidth} auto`
//   });
//   $('.preview').show();

//   $('.cursor-overlay').width($(this).width() / ZOOM_LEVEL);
//   $('.cursor-overlay').height($(this).height() / ZOOM_LEVEL);
//   $('.cursor-overlay').show();
// }

// function leave() {
//   $('.preview').hide();
//   $('.cursor-overlay').hide();
// }

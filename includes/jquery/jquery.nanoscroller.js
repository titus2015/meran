/*
 * Meran - MERAN UNLP is a ILS (Integrated Library System) wich provides Catalog,
 * Circulation and User's Management. It's written in Perl, and uses Apache2
 * Web-Server, MySQL database and Sphinx 2 indexing.
 * Copyright (C) 2009-2013 Grupo de desarrollo de Meran CeSPI-UNLP
 *
 * This file is part of Meran.
 *
 * Meran is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Meran is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Meran.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(d,f,e){var g,h;h=function(){var c,a,b;a=e.createElement("div");a.style.position="absolute";a.style.width="100px";a.style.height="100px";a.style.overflow="scroll";e.body.appendChild(a);c=a.offsetWidth;b=a.scrollWidth;e.body.removeChild(a);return c-b};g=function(){function c(a){this.el=a;this.generate();this.createEvents();this.addEvents();this.reset()}c.prototype.createEvents=function(){var a=this;this.events={down:function(b){a.isDrag=!0;a.offsetY=b.clientY-a.slider.offset().top;a.pane.addClass("active");
d(e).bind("mousemove",a.events.drag);d(e).bind("mouseup",a.events.up);return!1},drag:function(b){a.sliderY=b.clientY-a.el.offset().top-a.offsetY;a.scroll();return!1},up:function(){a.isDrag=!1;a.pane.removeClass("active");d(e).unbind("mousemove",a.events.drag);d(e).unbind("mouseup",a.events.up);return!1},resize:function(){a.reset()},panedown:function(b){a.sliderY=b.clientY-a.el.offset().top-0.5*a.sliderH;a.scroll();a.events.down(b)},scroll:function(){var b;!0!==a.isDrag&&(b=a.content[0],a.slider.css({top:b.scrollTop/
(b.scrollHeight-b.clientHeight)*(a.paneH-a.sliderH)+"px"}))},wheel:function(b){a.sliderY+=-b.wheelDeltaY||-b.delta;a.scroll();return!1}}};c.prototype.addEvents=function(){var a,b;a=this.events;b=this.pane;d(f).bind("resize",a.resize);this.slider.bind("mousedown",a.down);b.bind("mousedown",a.panedown);this.content.bind("scroll",a.scroll);f.addEventListener&&(b=b[0],b.addEventListener("mousewheel",a.wheel,!1),b.addEventListener("DOMMouseScroll",a.wheel,!1))};c.prototype.removeEvents=function(){var a,
b;a=this.events;b=this.pane;d(f).unbind("resize",a.resize);this.slider.unbind("mousedown",a.down);b.unbind("mousedown",a.panedown);this.content.unbind("scroll",a.scroll);f.addEventListener&&(b=b[0],b.removeEventListener("mousewheel",a.wheel,!1),b.removeEventListener("DOMMouseScroll",a.wheel,!1))};c.prototype.generate=function(){this.el.append('<div class="pane"><div class="slider"></div></div>');console.log(this.el.children()[0]);this.content=d(this.el.children()[0]);this.slider=this.el.find(".slider");
this.pane=this.el.find(".pane");this.scrollW=h();if(0===this.scrollbarWidth)this.scrollW=0;this.content.css({right:-this.scrollW+"px"})};c.prototype.reset=function(){var a;if(!0===this.isDead)this.isDead=!1,this.pane.show(),this.addEvents();a=this.content[0];this.contentH=a.scrollHeight+this.scrollW;this.paneH=this.pane.outerHeight();this.sliderH=this.paneH/this.contentH*this.paneH;this.sliderH=Math.round(this.sliderH);this.scrollH=this.paneH-this.sliderH;this.slider.height(this.sliderH);this.diffH=
a.scrollHeight-a.clientHeight;this.pane.show();this.paneH>=this.content[0].scrollHeight&&this.pane.hide()};c.prototype.scroll=function(){var a;this.sliderY=Math.max(0,this.sliderY);this.sliderY=Math.min(this.scrollH,this.sliderY);a=this.paneH-this.contentH+this.scrollW;a=a*this.sliderY/this.scrollH;this.content.scrollTop(-a);return this.slider.css({top:this.sliderY})};c.prototype.scrollBottom=function(a){var b,c;b=this.diffH;c=this.content[0].scrollTop;this.reset();c<b&&0!==c||this.content.scrollTop(this.contentH-
this.content.height()-a)};c.prototype.scrollTop=function(a){this.reset();this.content.scrollTop(a+0)};c.prototype.stop=function(){this.isDead=!0;this.removeEvents();this.pane.hide()};return c}();d.fn.nanoScroller=function(c){c||(c={});d.browser.msie&&8>parseInt(d.browser.version,10)||this.each(function(){var a,b;a=d(this);b=a.data("scrollbar");void 0===b&&(b=new g(a),a.data("scrollbar",b));return c.scrollBottom?b.scrollBottom(c.scrollBottom):c.scrollTop?b.scrollTop(c.scrollTop):"bottom"===c.scroll?
b.scrollBottom(0):"top"===c.scroll?b.scrollTop(0):c.stop?b.stop():b.reset()})}})(jQuery,window,document);
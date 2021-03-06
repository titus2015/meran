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

var objAH_search;var ORDEN="titulo";var SENTIDO_ORDEN=0;var combinables=['titulo','autor','tipo','signatura','tipo_nivel3_id'];var noCombinables=['keyword','isbn','dictionary','codBarra','estante','tema'];var shouldScroll=true;function ordenar_busqueda_catalogo(orden){if(orden==ORDEN){if(SENTIDO_ORDEN==1){SENTIDO_ORDEN=0;}else{SENTIDO_ORDEN=1;}}else{SENTIDO_ORDEN=1;ORDEN=orden;}
objAH_search.orden=orden;objAH_search.sentido_orden=SENTIDO_ORDEN;objAH_search.sort(orden);}
function updateInfoBusquedas(responseText){var result_div_id="marco_contenido_datos";if(es_avanzada){result_div_id="resultBusqueda";}else{$('#marco_contenido_datos').html("");}
$("#volver").hide();$('#'+result_div_id).html(responseText);closeModal();if(shouldScroll)
scrollTo(result_div_id);}
function updateInfoBusquedasBar(responseText){clearInterval(mensajes_interval_id);$('#navBarResult').html('');updateInfoBusquedas(responseText);$(window).unbind('scroll');}
function busquedaPorTipoDoc(){objAH_search=new AjaxHelper(updateBusquedaCombinable);objAH_search.debug=true;objAH_search.showOverlay=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.only_available=($('#only_available').attr('checked'))?1:0;objAH_search.tipo_nivel3_name=$('#tipo_nivel3_id').val();objAH_search.tipoAccion='BUSQUEDA_AVANZADA';objAH_search.funcion='changePage_search';objAH_search.sendToServer();}
function busquedaCombinable(){var radio=$("#tipo:checked");var tipo=radio[0].value;objAH_search=new AjaxHelper(updateBusquedaCombinable);objAH_search.debug=true;objAH_search.showOverlay=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.titulo=$('#titulo').val();objAH_search.tipo=tipo;objAH_search.autor=$('#autor').val();objAH_search.only_available=($('#only_available').attr('checked'))?1:0;objAH_search.signatura=$('#signatura').val();objAH_search.tipo_nivel3_name=$('#tipo_nivel3_id').val();objAH_search.tema=$('#tema').val();objAH_search.codBarra=$('#codBarra').val();objAH_search.isbn=$('#isbn').val();objAH_search.tipoAccion='BUSQUEDA_AVANZADA';objAH_search.funcion='changePage_search';objAH_search.sendToServer();}
function updateBusquedaCombinable(responseText){updateInfoBusquedas(responseText);}
function changePage_search(ini,orden){objAH_search.changePage(ini);}
function buscarBar(){objAH_search=new AjaxHelper(updateInfoBusquedasBar);es_avanzada=false;objAH_search.showOverlay=true;objAH_search.debug=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.keyword=$('#keyword-bar').val();objAH_search.shouldScroll=true;objAH_search.tipoAccion='BUSQUEDA_COMBINADA';objAH_search.match_mode="SPH_MATCH_ALL";objAH_search.funcion='changePage_search';if(jQuery.trim(objAH_search.keyword).length>0)
objAH_search.sendToServer();}
function buscar(doScroll){var limite_caracteres=3;var cumple_limite=true;var cumple_vacio=true;if(doScroll)
shouldScroll=doScroll;if((jQuery.trim($('#titulo').val())!='')||(jQuery.trim($('#autor').val())!='')||(jQuery.trim($('#signatura').val())!='')||(jQuery.trim($('#dictionary').val())!='')||(jQuery.trim($('#isbn').val())!='')||(jQuery.trim($('#codBarra').val())!='')||(jQuery.trim($('#tema').val())!=''))
{busquedaCombinable();}
else if($.trim($('#keyword').val())!=''){if((jQuery.trim($('#keyword').val())).length<limite_caracteres){cumple_limite=false;}else{busquedaPorKeyword();}}
else if($.trim($('#estante').val())!=''){if((jQuery.trim($('#estante').val())).length<limite_caracteres){cumple_limite=false;}else{busquedaPorEstante();}}
else if($('#tipo_nivel3_id').val()!=""){busquedaCombinable();}
else{cumple_vacio=false;}
if(!cumple_limite){jAlert(INGRESE_AL_MENOS_TRES_CARACTERES_PARA_REALIZAR_LA_BUSQUEDA);}else if(!cumple_vacio){jAlert(INGRESE_DATOS_PARA_LA_BUSQUEDA)}}
function buscarSuggested(suggested){busquedaPorKeyword(suggested);if($('#keyword').val())
$('#keyword').val(suggested);else
$('#keyword-bar').val(suggested);}
function busquedaPorKeyword(suggested){var keyword="";if($('#keyword').val())
keyword=$('#keyword').val();else
keyword=$('#keyword-bar').val();objAH_search=new AjaxHelper(updateBusquedaPorKeyword);objAH_search.showOverlay=true;objAH_search.debug=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.match_mode=$('#match_mode').val();if(objAH_search.match_mode=="SPH_MATCH_BOOLEAN"){keyword=keyword.replace(/\&/g," AND ");keyword=keyword.replace(/\|/g," OR ");keyword=keyword.replace(/\-/g," NOT ");}
if(suggested){objAH_search.keyword=suggested;objAH_search.from_suggested=1;}else{objAH_search.keyword=keyword;}
objAH_search.only_available=($('#only_available').attr('checked'))?1:0;objAH_search.tipoAccion='BUSQUEDA_COMBINADA';objAH_search.funcion='changePage_search';objAH_search.sendToServer();}
function updateBusquedaPorKeyword(responseText){updateInfoBusquedas(responseText);var keyword="";if($('#keyword').val())
keyword=$('#keyword').val();else
keyword=$('#keyword-bar').val();}
function busquedaPorEstante(){objAH_search=new AjaxHelper(updateInfoBusquedas);objAH_search.showOverlay=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.debug=true;objAH_search.funcion='changePage_search';objAH_search.estante=$('#estante').val();objAH_search.tipoAccion="BUSQUEDA_POR_ESTANTE";objAH_search.sendToServer();}
function verTema(tema){objAH_search=new AjaxHelper(updateInfoBusquedas);objAH_search.showOverlay=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.debug=true;objAH_search.funcion='changePage_search';objAH_search.tema=tema;objAH_search.tipoAccion="BUSQUEDA_POR_TEMA";objAH_search.sendToServer();}
function cambiarEstadoCampos(campos,clase){for(i=0;i<campos.length;i++){$('#'+campos[i]).attr('class',clase);}}
function buscarPorAutor(completo){objAH_search=new AjaxHelper(updateInfoBusquedas);objAH_search.showOverlay=true;objAH_search.url=URL_PREFIX+'/busquedas/busquedasDB.pl';objAH_search.debug=true;objAH_search.funcion='changePage_search';objAH_search.only_available=($('#only_available').attr('checked'))?1:0;objAH_search.completo=completo;objAH_search.tipoAccion="BUSQUEDA_POR_AUTOR";objAH_search.sendToServer();}

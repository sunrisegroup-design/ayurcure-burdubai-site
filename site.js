(function(){
var menu=document.getElementById('menu'),nav=document.getElementById('nav');
function setMenu(o){nav.classList.toggle('open',o);menu.setAttribute('aria-expanded',String(o));}
if(menu&&nav){
 menu.addEventListener('click',function(){setMenu(!nav.classList.contains('open'));});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);menu.focus();}});
 document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target))setMenu(false);});
}
/* gallery filters */
var tabs=document.querySelectorAll('.tab[data-filter]');
tabs.forEach(function(b){b.addEventListener('click',function(){
 tabs.forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false');});
 b.classList.add('active');b.setAttribute('aria-pressed','true');
 var f=b.dataset.filter;
 document.querySelectorAll('.gsection').forEach(function(s){
  var hide=f!=='all'&&s.dataset.type!==f;s.hidden=hide;
  if(hide)s.querySelectorAll('video').forEach(function(v){v.pause();});
 });
});});
var more=document.getElementById('loadmore');
if(more){more.addEventListener('click',function(){
 var hidden=document.querySelectorAll('#photogrid [data-extra][hidden]');
 for(var i=0;i<9&&i<hidden.length;i++)hidden[i].hidden=false;
 if(document.querySelectorAll('#photogrid [data-extra][hidden]').length===0)more.hidden=true;
});}
/* play one video at a time */
document.addEventListener('play',function(e){
 if(e.target.tagName!=='VIDEO')return;
 document.querySelectorAll('video').forEach(function(v){if(v!==e.target)v.pause();});
},true);
/* booking form */
var form=document.getElementById('appointment-form');
if(form){
 var d=form.elements.namedItem('date');
 if(d){var t=new Date();d.min=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');}
 form.addEventListener('submit',function(e){
  e.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}
  var g=function(n){return form.elements.namedItem(n).value;};
  var rows=[['Name',g('name')],['Mobile',g('phone')],['Treatment',g('treatment')],['Preferred date',g('date')],['Preferred time',g('time')],['Using insurance',g('insurance')],['Additional information',g('notes')||'None']];
  var msg='Hello Ayurcure, I would like to request an appointment.\n'+rows.map(function(r){return r[0]+': '+r[1];}).join('\n');
  var url='https://wa.me/971562126040?text='+encodeURIComponent(msg);
  var a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();document.body.removeChild(a);
  var s=document.getElementById('form-status');
  if(s){s.textContent='';var l=document.createElement('span');l.textContent='WhatsApp should now open with your request. If it did not, ';var k=document.createElement('a');k.href=url;k.target='_blank';k.rel='noopener';k.textContent='tap here to open WhatsApp';l.appendChild(k);l.appendChild(document.createTextNode('.'));s.appendChild(l);}
 });
}
})();

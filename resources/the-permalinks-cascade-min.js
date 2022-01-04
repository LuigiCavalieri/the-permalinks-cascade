/**
 * Copyright 2022 Luigi Cavalieri.
 * @license GPL v3.0 (https://opensource.org/licenses/GPL-3.0).
 * *************************************************************** */
function ThePermalinksCascadeSetting(e){this.id="tpc-"+e,this._target=document.getElementById(this.id),this._jqTarget=null,this._row=null}function ThePermalinksCascadePingUI(e){this.mouseIsOn=!1,this.isVisible=!1,this.pingingUI=e,this.pingingBubble=e.getElementsByClassName("tpc-ap-bubble")[0],this.statusMessages={};const s=this;var t=e.getElementsByClassName("tpc-ap-switch-control");jQuery(e).hover(function(){s.show()},function(){s.hide()}),t.length&&(this.switchControl=t[0],this.switchControl.onchange=function(){var t={action:"handleTPCAdminAjaxRequest",tpc_action:"enable_automatic_pinging",enable_ap:Number(this.checked)};jQuery.post(ajaxurl,t,function(e){return"ok"==e&&("on"in s.statusMessages||(s.statusMessages={on:s.pingingBubble.getElementsByClassName("tpc-ap-on-status-msg")[0],off:s.pingingBubble.getElementsByClassName("tpc-ap-off-status-msg")[0]}),void(t.enable_ap?s.toggleStatus("off"):s.toggleStatus("on")))}).fail(function(){s.switchControl.checked=!1})})}ThePermalinksCascadeSetting.prototype.value=function(){return this._target?this._target.value:null},ThePermalinksCascadeSetting.prototype.disable=function(e){if(!this._target)return!1;this._target.disabled=e=void 0===e?!0:e},ThePermalinksCascadeSetting.prototype.bindEvent=function(e,t){this._jqTarget||(this._jqTarget=jQuery(this._target)),this._jqTarget.on(e,t)},ThePermalinksCascadeSetting.prototype.isChecked=function(){return this._target?this._target.checked:null},ThePermalinksCascadeSetting.prototype.hide=function(e){if(!this._target)return!1;this._row||(this._row=this._target.parentNode.parentNode),this._row.style.display=e||void 0===e?"none":"table-row"},ThePermalinksCascadeSetting.prototype.toggle=function(){if(!this._target)return!1;this._row||(this._row=this._target.parentNode.parentNode),"none"==this._row.style.display?this._row.style.display="table-row":this._row.style.display="none"},ThePermalinksCascadePingUI.prototype.toggleStatus=function(e){var t="on"==e?"off":"on",s="tpc-automatic-pinging-",i=s+e,s=s+t;this.pingingUI.classList.replace(i,s),this.pingingBubble.classList.replace(i,s),this.statusMessages[e].style.display="none",this.statusMessages[t].style.display="inline-block"},ThePermalinksCascadePingUI.prototype.show=function(){this.mouseIsOn=!0,this.isVisible||(this.isVisible=!0,this.pingingBubble.style.display="block")},ThePermalinksCascadePingUI.prototype.hide=function(){this.mouseIsOn=!1,setTimeout(function(e){e.mouseIsOn||(e.isVisible=!1,e.pingingBubble.style.display="none")},800,this)};const ThePermalinksCascade=function(m){return{init:function(e,t){switch(e){case"tpc-dashboard":const h=document.getElementById("tpc-page-for-site-tree");if(h){if("0"===h.value){const b=document.getElementById("tpc-primary-site_tree-form-btn");b.disabled=!0,h.onchange=function(){b.disabled="0"===h.value}}var s=null,i=null,n=!1;const d=document.getElementById("site-tree-content-types-fieldset"),u=d.parentElement,p=document.createElement("div"),g=document.createElement("a");g.innerHTML=t.sftEnableBtnTitle,g.id="tpc-sft-enable-btn",g.setAttribute("href","#"),g.onclick=function(){return n?(n=!1,m(d).sortable("destroy"),this.id="tpc-sft-enable-btn",this.innerHTML=t.sftEnableBtnTitle,p.removeChild(s),u.classList.remove("tpc-sortable"),u.parentElement.removeChild(i)):(n=!0,s||((s=document.createElement("input")).id="tpc-sft-save-btn",s.setAttribute("type","submit"),s.setAttribute("name","save_order"),s.setAttribute("value",t.sftSaveBtnTitle),(i=document.createElement("p")).innerHTML="<small>"+t.sortableFieldsetTooltip+"</small>"),m(d).sortable({change:function(e,t){s.disabled=!1}}),this.id="tpc-sft-cancel-btn",this.innerHTML=t.sftCancelBtnTitle,s.disabled=!0,p.appendChild(s),u.classList.add("tpc-sortable"),u.parentElement.appendChild(i)),this.blur(),!1},p.id="tpc-sortable-fieldset-toolbar",p.appendChild(g),u.parentElement.insertBefore(p,u)}var a=[],o=document.getElementsByClassName("tpc-automatic-pinging-ui");if(o)for(var r=0;r<o.length;r++)a[r]=new ThePermalinksCascadePingUI(o[r]);break;case"tpc-site_tree":for(var l={},c=["page-exclude-children","page-hierarchical","post-group-by","post-order-by","authors-show-avatar","authors-avatar-size"],r=0;r<c.length;r++)l[c[r].replace(/-/g,"_")]=new ThePermalinksCascadeSetting(c[r]);l.page_exclude_children.isChecked()&&l.page_hierarchical.hide(),l.authors_show_avatar.isChecked()||l.authors_avatar_size.hide(),"date"==l.post_group_by.value()&&l.post_order_by.hide(),l.page_exclude_children.bindEvent("click",function(){l.page_hierarchical.toggle()}),l.authors_show_avatar.bindEvent("click",function(){l.authors_avatar_size.toggle()}),l.post_group_by.bindEvent("change",function(){l.post_order_by.hide("date"==this.value)})}}}}(jQuery);
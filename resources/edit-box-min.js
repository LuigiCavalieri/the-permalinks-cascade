/**
 * Copyright 2021 Luigi Cavalieri.
 * @license GPL v3.0 (https://opensource.org/licenses/GPL-3.0).
 * *************************************************************** */
!function(d){var l=inlineEditPost.edit;inlineEditPost.edit=function(e){l.apply(this,arguments);var t=document.getElementById("tpc-topic-id");if(!t)return!1;var n=0;if((n="object"==typeof e?parseInt(this.getId(e)):n)<=0)return!1;for(var i=!1,o=document.getElementById("post-"+n).getElementsByClassName("column-taxonomy-tpc_topic")[0].innerText,c=0;c<t.options.length;c++){var d=t.options[c];d.innerText==o?(i=!0,d.setAttribute("selected","selected")):d.removeAttribute("selected")}return i||t.options[0].setAttribute("selected","selected"),!0},d(document).on("click","#bulk_edit",function(){for(var e=[],t=document.getElementById("bulk-titles"),n=0;n<t.childNodes.length;n++){var i=t.childNodes[n];e.push(i.id.replace(/^(ttle)/i,""))}var o=document.getElementById("tpc-nonce").value,c=d("#tpc-bulk-edit-box select").serializeArray();jQuery.post(ajaxurl,{action:"handleTPCAdminAjaxRequest",tpc_action:"tpc_bulk_edit",tpc_nonce:o,post_ids:e,data:c})})}(jQuery);
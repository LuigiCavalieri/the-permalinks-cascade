/**
 * Copyright 2021 Luigi Cavalieri.
 * @license GPL v3.0 (https://opensource.org/licenses/GPL-3.0).
 * *************************************************************** */
const ThePermalinksCascade=function(e){const a=e.blockEditor,t=e.blocks;var l=e.element;const s=e.components,n=e.serverSideRender,r=e.data,o=e.i18n.__,i=l.createElement;return{registerBlocks:function(e){t.registerBlockType("the-permalinks-cascade/page",{apiVersion:2,icon:"editor-ul",supports:{html:!1,reusable:!1,align:!1},edit:function(t){var e=a.useBlockProps();return i("div",e,[i(n,{key:"server-side-render",block:"the-permalinks-cascade/page",attributes:t.attributes}),i(a.InspectorControls,{key:"inspector-controls"},i(s.PanelBody,{title:o("Settings","the-permalinks-cascade"),initialOpen:!0},[i(s.TextControl,{key:"title",label:o("Title","the-permalinks-cascade"),value:t.attributes.title,onChange:function(e){t.setAttributes({title:e})}}),i(s.SelectControl,{key:"hierarchical",label:o("Hyper-list style","the-permalinks-cascade"),value:t.attributes.hierarchical,options:[{value:"1",label:o("Hierarchical","the-permalinks-cascade")},{value:"0",label:o("Flat","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({hierarchical:e})}}),i(s.SelectControl,{key:"order_by",label:o("Order by","the-permalinks-cascade"),value:t.attributes.order_by,options:[{value:"menu_order",label:o("Menu order & Title","the-permalinks-cascade")},{value:"title",label:o("Title","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({order_by:e})}}),i(s.ToggleControl,{key:"exclude_children",label:o("Only primary pages","the-permalinks-cascade"),checked:t.attributes.exclude_children,onChange:function(e){t.setAttributes({exclude_children:e})}}),i(s.ToggleControl,{key:"dehyperlink_parents",label:o("De-hyperlink parent pages","the-permalinks-cascade"),checked:t.attributes.dehyperlink_parents,onChange:function(e){t.setAttributes({dehyperlink_parents:e})}}),i(s.SelectControl,{key:"dehyperlinking_level",label:o("De-hyperlink parent pages up to...","the-permalinks-cascade"),value:t.attributes.dehyperlinking_level,options:[{label:o("First level","the-permalinks-cascade"),value:"0"},{label:o("Second level","the-permalinks-cascade"),value:"1"},{label:o("Third level","the-permalinks-cascade"),value:"2"}],onChange:function(e){t.setAttributes({dehyperlinking_level:e})}}),i(s.ToggleControl,{key:"group_by_topic",label:o("Group by Topic","the-permalinks-cascade"),checked:t.attributes.group_by_topic,onChange:function(e){t.setAttributes({group_by_topic:e})}}),i(s.ToggleControl,{key:"show_topicless",label:o("Show pages without Topic","the-permalinks-cascade"),checked:t.attributes.show_topicless,onChange:function(e){t.setAttributes({show_topicless:e})}}),i(s.TextControl,{key:"limit",label:o("Max. number of items","the-permalinks-cascade"),value:t.attributes.limit,onChange:function(e){t.setAttributes({limit:e})}}),i(s.TextControl,{key:"exclude",label:o("Exclude (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.exclude,onChange:function(e){t.setAttributes({exclude:e})}}),i(s.TextControl,{key:"include_only",label:o("Include only (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.include_only,onChange:function(e){t.setAttributes({include_only:e})}})]))])}}),t.registerBlockType("the-permalinks-cascade/post",{apiVersion:2,icon:"editor-ul",supports:{html:!1,reusable:!1,align:!1},edit:function(t){var e=a.useBlockProps();return i("div",e,[i(n,{key:"server-side-render",block:"the-permalinks-cascade/post",attributes:t.attributes}),i(a.InspectorControls,{key:"inspector-controls"},i(s.PanelBody,{title:o("Settings","the-permalinks-cascade"),initialOpen:!0},[i(s.TextControl,{key:"title",label:o("Title","the-permalinks-cascade"),value:t.attributes.title,onChange:function(e){t.setAttributes({title:e})}}),i(s.SelectControl,{key:"group_by",label:o("Group by","the-permalinks-cascade"),value:t.attributes.group_by,options:[{value:"none",label:"-"},{value:"date",label:o("Date","the-permalinks-cascade")},{value:"category",label:o("Category","the-permalinks-cascade")},{value:"author",label:o("Author","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({group_by:e})}}),i(s.ToggleControl,{key:"hyperlink_group_title",label:o("Hyperlink group's title","the-permalinks-cascade"),checked:t.attributes.hyperlink_group_title,onChange:function(e){t.setAttributes({hyperlink_group_title:e})}}),i(s.SelectControl,{key:"order_by",label:o("Order by","the-permalinks-cascade"),value:t.attributes.order_by,options:[{value:"post_date",label:o("Most recent","the-permalinks-cascade")},{value:"comment_count",label:o("Most popular","the-permalinks-cascade")},{value:"post_title",label:o("Title","the-permalinks-cascade")},{value:"post_date_asc",label:o("Older","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({order_by:e})}}),i(s.ToggleControl,{key:"pop_stickies",label:o("Keep Featured Posts at the top","the-permalinks-cascade"),checked:t.attributes.pop_stickies,onChange:function(e){t.setAttributes({pop_stickies:e})}}),i(s.ToggleControl,{key:"show_excerpt",label:o("Show a short excerpt","the-permalinks-cascade"),checked:t.attributes.show_excerpt,onChange:function(e){t.setAttributes({show_excerpt:e})}}),i(s.TextControl,{key:"excerpt_length",label:o("Excerpt length (num. of characters)","the-permalinks-cascade"),value:t.attributes.excerpt_length,onChange:function(e){t.setAttributes({excerpt_length:e})}}),i(s.ToggleControl,{key:"show_comments_count",label:o("Show the number of comments","the-permalinks-cascade"),checked:t.attributes.show_comments_count,onChange:function(e){t.setAttributes({show_comments_count:e})}}),i(s.ToggleControl,{key:"show_date",label:o("Show the date of publication","the-permalinks-cascade"),checked:t.attributes.show_date,onChange:function(e){t.setAttributes({show_date:e})}}),i(s.TextControl,{key:"limit",label:o("Max. number of items","the-permalinks-cascade"),value:t.attributes.limit,onChange:function(e){t.setAttributes({limit:e})}}),i(s.TextControl,{key:"exclude",label:o("Exclude (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.exclude,onChange:function(e){t.setAttributes({exclude:e})}}),i(s.TextControl,{key:"include_only",label:o("Include only (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.include_only,onChange:function(e){t.setAttributes({include_only:e})}})]))])}}),e.showCustomPostBlock&&t.registerBlockType("the-permalinks-cascade/custom-post",{apiVersion:2,icon:"editor-ul",supports:{html:!1,reusable:!1,align:!1},edit:function(t){var e=r.useSelect(function(e){var t=[];const a=["post","page","attachment"];var l=e("core").getPostTypes({per_page:-1});if(l)for(var s=0;s<l.length;s++){var n=l[s].slug;l[s].viewable&&!a.includes(n)&&t.push({value:n,label:l[s].name})}return t},[]);return i("div",a.useBlockProps(),[i(n,{key:"server-side-render",block:"the-permalinks-cascade/custom-post",attributes:t.attributes}),i(a.InspectorControls,{key:"inspector-controls"},i(s.PanelBody,{title:o("Settings","the-permalinks-cascade"),initialOpen:!0},[i(s.SelectControl,{key:"post_slug",label:o("Post Type","the-permalinks-cascade"),value:t.attributes.post_slug,options:[{value:"none",label:"— "+o("Select","the-permalinks-cascade")+" —"}].concat(e),onChange:function(e){t.setAttributes({post_slug:e})}}),i(s.TextControl,{key:"title",label:o("Title","the-permalinks-cascade"),value:t.attributes.title,onChange:function(e){t.setAttributes({title:e})}}),i(s.SelectControl,{key:"order_by",label:o("Order by","the-permalinks-cascade"),value:t.attributes.order_by,options:[{value:"post_title",label:o("Title","the-permalinks-cascade")},{value:"post_date",label:o("Most recent","the-permalinks-cascade")},{value:"post_date_asc",label:o("Older","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({order_by:e})}}),i(s.SelectControl,{key:"hierarchical",label:o("Hyper-list style","the-permalinks-cascade"),value:t.attributes.hierarchical,options:[{value:"1",label:o("Hierarchical","the-permalinks-cascade")},{value:"0",label:o("Flat","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({hierarchical:e})}}),i(s.TextControl,{key:"limit",label:o("Max. number of items","the-permalinks-cascade"),value:t.attributes.limit,onChange:function(e){t.setAttributes({limit:e})}}),i(s.TextControl,{key:"exclude",label:o("Exclude (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.exclude,onChange:function(e){t.setAttributes({exclude:e})}}),i(s.TextControl,{key:"include_only",label:o("Include only (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.include_only,onChange:function(e){t.setAttributes({include_only:e})}})]))])}}),t.registerBlockType("the-permalinks-cascade/taxonomy",{apiVersion:2,icon:"editor-ul",supports:{html:!1,reusable:!1,align:!1},edit:function(t){var e=r.useSelect(function(e){var t=[],a=e("core").getTaxonomies({per_page:-1});if(a)for(var l=0;l<a.length;l++)a[l].visibility.public&&t.push({value:a[l].slug,label:a[l].name});return t},[]);return i("div",a.useBlockProps(),[i(n,{key:"server-side-render",block:"the-permalinks-cascade/taxonomy",attributes:t.attributes}),i(a.InspectorControls,{key:"inspector-controls"},i(s.PanelBody,{title:o("Settings","the-permalinks-cascade"),initialOpen:!0},[i(s.SelectControl,{key:"taxonomy_slug",label:o("Taxonomy","the-permalinks-cascade"),value:t.attributes.taxonomy_slug,options:e,onChange:function(e){t.setAttributes({taxonomy_slug:e})}}),i(s.TextControl,{key:"title",label:o("Title","the-permalinks-cascade"),value:t.attributes.title,onChange:function(e){t.setAttributes({title:e})}}),i(s.ToggleControl,{key:"show_count",label:o("Show count of posts","the-permalinks-cascade"),checked:t.attributes.show_count,onChange:function(e){t.setAttributes({show_count:e})}}),i(s.SelectControl,{key:"order_by",label:o("Order by","the-permalinks-cascade"),value:t.attributes.order_by,options:[{value:"name",label:o("Name","the-permalinks-cascade")},{value:"count",label:o("Most used","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({order_by:e})}}),i(s.SelectControl,{key:"hierarchical",label:o("Hyper-list style","the-permalinks-cascade"),value:t.attributes.hierarchical,options:[{value:"1",label:o("Hierarchical","the-permalinks-cascade")},{value:"0",label:o("Flat","the-permalinks-cascade")}],onChange:function(e){t.setAttributes({hierarchical:e})}}),i(s.TextControl,{key:"limit",label:o("Max. number of items","the-permalinks-cascade"),value:t.attributes.limit,onChange:function(e){t.setAttributes({limit:e})}}),i(s.TextControl,{key:"exclude",label:o("Exclude (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.exclude,onChange:function(e){t.setAttributes({exclude:e})}}),i(s.TextControl,{key:"include_only",label:o("Include only (comma-separated IDs)","the-permalinks-cascade"),value:t.attributes.include_only,onChange:function(e){t.setAttributes({include_only:e})}})]))])}})}}}(window.wp);
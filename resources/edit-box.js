/**
 * Copyright 2021 Luigi Cavalieri.
 * @license GPL v3.0 (https://opensource.org/licenses/GPL-3.0).
 * *************************************************************** */

(function($) {
    var wp_inline_edit = inlineEditPost.edit;

    inlineEditPost.edit = function( id ) {
        wp_inline_edit.apply( this, arguments );

        var topic_select = document.getElementById( 'tpc-topic-id' );

        if (! topic_select ) {
            return false;
        }

        var post_id = 0;

        if ( 'object' == typeof( id ) ) {
            post_id = parseInt( this.getId( id ) );
        }

        if ( post_id <= 0 ) {
            return false;
        }
        
        var option_selected = false;
        var post_row        = document.getElementById( 'post-' + post_id );
        var topic_name      = post_row.getElementsByClassName( 'column-taxonomy-tpc_topic' )[0].innerText;

        for ( var i = 0; i < topic_select.options.length; i++ ) {
            var option = topic_select.options[i];

            if ( option.innerText == topic_name ) {
                option_selected = true;

                option.setAttribute( 'selected', 'selected' );
            }
            else {
                option.removeAttribute( 'selected' );
            }
        }

        if (! option_selected ) {
            topic_select.options[0].setAttribute( 'selected', 'selected' );
        }

        return true;
    };

    $( document ).on( 'click', '#bulk_edit', function() {
        var post_ids    = [];
        var bulk_titles = document.getElementById( 'bulk-titles' );
        
        for ( var i = 0; i < bulk_titles.childNodes.length; i++ ) {
            var title = bulk_titles.childNodes[i];
            
            post_ids.push( title.id.replace( /^(ttle)/i, '' ) );
        }

        var nonce        = document.getElementById( 'tpc-nonce' ).value;
        var data         = $( '#tpc-bulk-edit-box select' ).serializeArray();
        var ajax_request = {
                 action: 'handleTPCAdminAjaxRequest',
             tpc_action: 'tpc_bulk_edit',
              tpc_nonce: nonce,
               post_ids: post_ids,
                   data: data
        };

        jQuery.post( ajaxurl, ajax_request );
    });
})(jQuery);
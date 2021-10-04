/**
 * Copyright 2021 Luigi Cavalieri.
 * @license GPL v3.0 (https://opensource.org/licenses/GPL-3.0).
 * *************************************************************** */


function ThePermalinksCascadeSetting( id ) {
	this.id		   = 'tpc-' + id;
	this._target   = document.getElementById( this.id );
	this._jqTarget = null;
	this._row	   = null;
}

ThePermalinksCascadeSetting.prototype.value = function() {
	if ( this._target ) {
		return this._target.value;
	}
	
	return null;
};

ThePermalinksCascadeSetting.prototype.disable = function( disable ) {
	if (! this._target ) {
		return false;
	}
		
	if ( 'undefined' == typeof disable ) {
		disable = true;
	}
	
	this._target.disabled = disable;
};
	
ThePermalinksCascadeSetting.prototype.bindEvent = function( event, handler ) {
	if (! this._jqTarget ) {
		this._jqTarget = jQuery( this._target );
	}
		
	this._jqTarget.on( event, handler );
};
	
ThePermalinksCascadeSetting.prototype.isChecked = function() {
	if ( this._target ) {
		return this._target.checked;
	}
		
	return null;
};
	
ThePermalinksCascadeSetting.prototype.hide = function( hide ) {
	if (! this._target ) {
		return false;
	}
		
	if (! this._row ) {
		this._row = this._target.parentNode.parentNode;
	}
	
	if ( hide || ( 'undefined' == typeof hide ) ) {
		this._row.style.display = 'none';
	}
	else {
		this._row.style.display = 'table-row';
	}
};

ThePermalinksCascadeSetting.prototype.toggle = function() {
	if (! this._target )
		return false;
		
	if (! this._row )
		this._row = this._target.parentNode.parentNode;
		
	if ( 'none' == this._row.style.display ) {
		this._row.style.display = 'table-row';
	}
	else {
		this._row.style.display = 'none';
	}
};


function ThePermalinksCascadePingUI( node ) {
    this.mouseIsOn      = false;
    this.isVisible      = false;
    
    this.pingingUI      = node;
    this.pingingBubble  = node.getElementsByClassName( 'tpc-ap-bubble')[0];
    this.statusMessages = {};
    
    const that         = this;
    const switch_nodes = node.getElementsByClassName( 'tpc-ap-switch-control' );

    jQuery( node ).hover( function(){ that.show() }, function(){ that.hide() } );

    if ( switch_nodes.length ) {
        this.switchControl = switch_nodes[0];
        this.switchControl.onchange = function() {
            var data = {
                   action: 'handleTPCAdminAjaxRequest',
               tpc_action: 'enable_automatic_pinging',
                enable_ap: Number( this.checked )
            };

            var request = jQuery.post( ajaxurl, data, function( response ) {
                if ( 'ok' != response ) {
                    return false;
                }

                if ( !( 'on' in that.statusMessages ) ) {
                    that.statusMessages = {
                         on: that.pingingBubble.getElementsByClassName( 'tpc-ap-on-status-msg' )[0],
                        off: that.pingingBubble.getElementsByClassName( 'tpc-ap-off-status-msg' )[0]
                    }; 
                }

                if ( data.enable_ap ) {
                    that.toggleStatus( 'off' );
                }
                else {
                    that.toggleStatus( 'on' );
                }
            });

            request.fail( function() {
                that.switchControl.checked = false;
            });
        };
    }
}

ThePermalinksCascadePingUI.prototype.toggleStatus = function( status ) {
    var alternate_status  = ( ( status == 'on' ) ? 'off' : 'on' );
    var class_prefix      = 'tpc-automatic-pinging-';
    var target_class      = class_prefix + status;
    var replacement_class = class_prefix + alternate_status;

    this.pingingUI.classList.replace( target_class, replacement_class );
    this.pingingBubble.classList.replace( target_class, replacement_class );

    this.statusMessages[status].style.display = 'none';
    this.statusMessages[alternate_status].style.display = 'inline-block';
};

ThePermalinksCascadePingUI.prototype.show = function() {
    this.mouseIsOn = true;

    if (! this.isVisible ) {
        this.isVisible = true;
        this.pingingBubble.style.display = 'block';
    }
};

ThePermalinksCascadePingUI.prototype.hide = function() {
    this.mouseIsOn = false;
        
    setTimeout( function( that ){
        if (! that.mouseIsOn ) {
            that.isVisible = false;
            that.pingingBubble.style.display = 'none';
        }
    }, 800, this );
};


const ThePermalinksCascade = ( function( $ ) {
    return {
		init: function( page_id, l10n ) {
			switch ( page_id ) {
				case 'tpc-dashboard':
					const site_tree_page_select = document.getElementById( 'tpc-page-for-site-tree' );
                    
					if ( site_tree_page_select ) {
                        if ( '0' === site_tree_page_select.value ) {
                            const primary_tb_btn = document.getElementById( 'tpc-primary-site_tree-form-btn' );

                            primary_tb_btn.disabled = true;

                            site_tree_page_select.onchange = function() {
                                primary_tb_btn.disabled = ( site_tree_page_select.value === '0' );
                            };
                        }

                        var sft_save_btn                   = null;
                        var sortable_fieldset_tooltip      = null;
                        var fieldset_sortability_enabled   = false;
                        const sortable_fieldset            = document.getElementById( 'site-tree-content-types-fieldset' );
                        const sortable_fieldset_container  = sortable_fieldset.parentElement;
                        const sortable_fieldset_toolbar    = document.createElement( 'div' );
                        const sft_toggle_sortability_btn   = document.createElement( 'a' );

                        sft_toggle_sortability_btn.innerHTML = l10n.sftEnableBtnTitle;
                        sft_toggle_sortability_btn.id        = 'tpc-sft-enable-btn';
                        sft_toggle_sortability_btn.setAttribute( 'href', '#' );

                        sft_toggle_sortability_btn.onclick = function() {
                            if ( fieldset_sortability_enabled ) {
                                fieldset_sortability_enabled = false;

                                $( sortable_fieldset ).sortable( 'destroy' );

                                this.id        = 'tpc-sft-enable-btn';
                                this.innerHTML = l10n.sftEnableBtnTitle;
                                
                                sortable_fieldset_toolbar.removeChild( sft_save_btn );
                                sortable_fieldset_container.classList.remove( 'tpc-sortable' );
                                sortable_fieldset_container.parentElement.removeChild( sortable_fieldset_tooltip );
                            }
                            else {
                                fieldset_sortability_enabled = true;

                                if (! sft_save_btn ) {
                                    sft_save_btn          = document.createElement( 'input' );
                                    sft_save_btn.id       = 'tpc-sft-save-btn';
                                    sft_save_btn.setAttribute( 'type', 'submit' );
                                    sft_save_btn.setAttribute( 'name', 'save_order' );
                                    sft_save_btn.setAttribute( 'value', l10n.sftSaveBtnTitle );
                                    
                                    sortable_fieldset_tooltip           = document.createElement( 'p' );
                                    sortable_fieldset_tooltip.innerHTML = '<small>' + l10n.sortableFieldsetTooltip + '</small>';
                                }

                                $( sortable_fieldset ).sortable({
                                    change: function( event, ui ) { sft_save_btn.disabled = false; }
                                });
                                
                                this.id        = 'tpc-sft-cancel-btn';
                                this.innerHTML = l10n.sftCancelBtnTitle;

                                sft_save_btn.disabled = true;

                                sortable_fieldset_toolbar.appendChild( sft_save_btn );
                                sortable_fieldset_container.classList.add( 'tpc-sortable' );
                                sortable_fieldset_container.parentElement.appendChild( sortable_fieldset_tooltip );
                            }

                            this.blur();

                            return false;
                        };

                        sortable_fieldset_toolbar.id = 'tpc-sortable-fieldset-toolbar';
                        sortable_fieldset_toolbar.appendChild( sft_toggle_sortability_btn );

                        sortable_fieldset_container.parentElement.insertBefore( sortable_fieldset_toolbar, 
                                                                                sortable_fieldset_container );
                    }

                    var ping_ui_objects = [];
                    var ping_ui_nodes   = document.getElementsByClassName( 'tpc-automatic-pinging-ui' );
   
                    if ( ping_ui_nodes ) {
                        for ( var i = 0; i < ping_ui_nodes.length; i++ ) {
                            ping_ui_objects[i] = new ThePermalinksCascadePingUI( ping_ui_nodes[i] );
                        }
                    }
					break;
					
				case 'tpc-site_tree':
					var settings = {};
					var ids		 = ['page-exclude-children', 'page-hierarchical', 'post-group-by', 
									'post-order-by', 'authors-show-avatar', 'authors-avatar-size'];
					
					for ( var i = 0; i < ids.length; i++ ) {
						settings[ ids[i].replace( /-/g, '_' ) ] = new ThePermalinksCascadeSetting( ids[i] );
					}
					
					// --- Initialise state
					if ( settings.page_exclude_children.isChecked() ) {
						settings.page_hierarchical.hide();
					}

					if (! settings.authors_show_avatar.isChecked() ) {
						settings.authors_avatar_size.hide();
					}
					
					if ( 'date' == settings.post_group_by.value() ) {
						settings.post_order_by.hide();
					}
					
					// --- Events binding
					settings.page_exclude_children.bindEvent( 'click', function() {
						settings.page_hierarchical.toggle();
					});
					settings.authors_show_avatar.bindEvent( 'click', function() {
						settings.authors_avatar_size.toggle();
					});
					
					settings.post_group_by.bindEvent( 'change', function() {
						settings.post_order_by.hide( this.value == 'date' );
					});
					break;
			}	
		}
	};
} )( jQuery );
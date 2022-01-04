/**
 * Copyright 2022 Luigi Cavalieri.
 * @license GPL v3.0 (https://opensource.org/licenses/GPL-3.0).
 * *************************************************************** */

const ThePermalinksCascade = ( function ( wp ) {
    const editor           = wp.blockEditor;
    const blocks           = wp.blocks;
    const element          = wp.element;
    const components       = wp.components;
    const ServerSideRender = wp.serverSideRender;
    const data             = wp.data;
    const __               = wp.i18n.__;
    const el               = element.createElement;

    return {
        registerBlocks: function( args ) {
            blocks.registerBlockType( 'the-permalinks-cascade/page', {
                apiVersion: 2,
                icon: 'editor-ul',
                supports: {
                    html: false,
                    reusable: false,
                    align: false
                },
                edit: function ( props ) {
                    var blockProps = editor.useBlockProps();

                    return el(
                        'div',
                        blockProps,
                        [
                            el( ServerSideRender, {
                                key: 'server-side-render',
                                block: 'the-permalinks-cascade/page',
                                attributes: props.attributes,
                            } ),
                            el( editor.InspectorControls, { key: 'inspector-controls' },
                                el( components.PanelBody, {
                                    title: __( 'Settings', 'the-permalinks-cascade' ),
                                    initialOpen: true,
                                }, [
                                    el( components.TextControl, {
                                        key: 'title',
                                        label: __( 'Title', 'the-permalinks-cascade' ),
                                        value: props.attributes.title,
                                        onChange: function ( value ) {
                                            props.setAttributes( { title: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'hierarchical',
                                        label: __( 'Hyper-list style', 'the-permalinks-cascade' ),
                                        value: props.attributes.hierarchical,
                                        options: [
                                            { value: '1', label: __( 'Hierarchical', 'the-permalinks-cascade' ) },
                                            { value: '0', label: __( 'Flat', 'the-permalinks-cascade' ) }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { hierarchical: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'order_by',
                                        label: __( 'Order by', 'the-permalinks-cascade' ),
                                        value: props.attributes.order_by,
                                        options: [
                                            { value: 'menu_order', label: __( 'Menu order & Title', 'the-permalinks-cascade' ) },
                                            { value: 'title',      label: __( 'Title', 'the-permalinks-cascade' ) }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { order_by: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'exclude_children',
                                        label: __( 'Only primary pages', 'the-permalinks-cascade' ),
                                        checked: props.attributes.exclude_children,
                                        onChange: function ( value ) {
                                            props.setAttributes( { exclude_children: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'dehyperlink_parents',
                                        label: __( 'De-hyperlink parent pages', 'the-permalinks-cascade' ),
                                        checked: props.attributes.dehyperlink_parents,
                                        onChange: function ( value ) {
                                            props.setAttributes( { dehyperlink_parents: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'dehyperlinking_level',
                                        label: __( 'De-hyperlink parent pages up to...', 'the-permalinks-cascade' ),
                                        value: props.attributes.dehyperlinking_level,
                                        options: [
                                            { label: __( 'First level', 'the-permalinks-cascade' ), value: '0' },
                                            { label: __( 'Second level', 'the-permalinks-cascade' ), value: '1' },
                                            { label: __( 'Third level', 'the-permalinks-cascade' ), value: '2' }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { dehyperlinking_level: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'group_by_topic',
                                        label: __( 'Group by Topic', 'the-permalinks-cascade' ),
                                        checked: props.attributes.group_by_topic,
                                        onChange: function ( value ) {
                                            props.setAttributes( { group_by_topic: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'show_topicless',
                                        label: __( 'Show pages without Topic', 'the-permalinks-cascade' ),
                                        checked: props.attributes.show_topicless,
                                        onChange: function ( value ) {
                                            props.setAttributes( { show_topicless: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'limit',
                                        label: __( 'Max. number of items', 'the-permalinks-cascade' ),
                                        value: props.attributes.limit,
                                        onChange: function ( value ) {
                                            props.setAttributes( { limit: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'exclude',
                                        label: __( 'Exclude (comma-separated IDs)', 'the-permalinks-cascade' ),
                                        value: props.attributes.exclude,
                                        onChange: function ( value ) {
                                            props.setAttributes( { exclude: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'include_only',
                                        label: __( 'Include only (comma-separated IDs)', 'the-permalinks-cascade' ),
                                        value: props.attributes.include_only,
                                        onChange: function ( value ) {
                                            props.setAttributes( { include_only: value } );
                                        }
                                    } )
                                ] )
                            )
                        ]
                    );
                }
            } );

            blocks.registerBlockType( 'the-permalinks-cascade/post', {
                apiVersion: 2,
                icon: 'editor-ul',
                supports: {
                    html: false,
                    reusable: false,
                    align: false
                },
                edit: function ( props ) {
                    var blockProps = editor.useBlockProps();

                    return el(
                        'div',
                        blockProps,
                        [
                            el( ServerSideRender, {
                                key: 'server-side-render',
                                block: 'the-permalinks-cascade/post',
                                attributes: props.attributes,
                            } ),
                            el( editor.InspectorControls, { key: 'inspector-controls' },
                                el( components.PanelBody, {
                                    title: __( 'Settings', 'the-permalinks-cascade' ),
                                    initialOpen: true,
                                }, [
                                    el( components.TextControl, {
                                        key: 'title',
                                        label: __( 'Title', 'the-permalinks-cascade' ),
                                        value: props.attributes.title,
                                        onChange: function ( value ) {
                                            props.setAttributes( { title: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'group_by',
                                        label: __( 'Group by', 'the-permalinks-cascade' ),
                                        value: props.attributes.group_by,
                                        options: [
                                            { value: 'none',     label: '-' }, 
                                            { value: 'date',     label: __( 'Date', 'the-permalinks-cascade' ) },
                                            { value: 'category', label: __( 'Category', 'the-permalinks-cascade' ) },
                                            { value: 'author',   label: __( 'Author', 'the-permalinks-cascade' ) }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { group_by: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'hyperlink_group_title',
                                        label: __( "Hyperlink group's title", 'the-permalinks-cascade' ),
                                        checked: props.attributes.hyperlink_group_title,
                                        onChange: function ( value ) {
                                            props.setAttributes( { hyperlink_group_title: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'order_by',
                                        label: __( 'Order by', 'the-permalinks-cascade' ),
                                        value: props.attributes.order_by,
                                        options: [
                                            { value: 'post_date',     label: __( 'Most recent', 'the-permalinks-cascade' ) },
                                            { value: 'comment_count', label: __( 'Most popular', 'the-permalinks-cascade' ) },
                                            { value: 'post_title',    label: __( 'Title', 'the-permalinks-cascade' ) },
                                            { value: 'post_date_asc', label: __( 'Older', 'the-permalinks-cascade' ) }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { order_by: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'pop_stickies',
                                        label: __( 'Keep Featured Posts at the top', 'the-permalinks-cascade' ),
                                        checked: props.attributes.pop_stickies,
                                        onChange: function ( value ) {
                                            props.setAttributes( { pop_stickies: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'show_excerpt',
                                        label: __( 'Show a short excerpt', 'the-permalinks-cascade' ),
                                        checked: props.attributes.show_excerpt,
                                        onChange: function ( value ) {
                                            props.setAttributes( { show_excerpt: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'excerpt_length',
                                        label: __( 'Excerpt length (num. of characters)', 'the-permalinks-cascade' ),
                                        value: props.attributes.excerpt_length,
                                        onChange: function ( value ) {
                                            props.setAttributes( { excerpt_length: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'show_comments_count',
                                        label: __( 'Show the number of comments', 'the-permalinks-cascade' ),
                                        checked: props.attributes.show_comments_count,
                                        onChange: function ( value ) {
                                            props.setAttributes( { show_comments_count: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'show_date',
                                        label: __( 'Show the date of publication', 'the-permalinks-cascade' ),
                                        checked: props.attributes.show_date,
                                        onChange: function ( value ) {
                                            props.setAttributes( { show_date: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'limit',
                                        label: __( 'Max. number of items', 'the-permalinks-cascade' ),
                                        value: props.attributes.limit,
                                        onChange: function ( value ) {
                                            props.setAttributes( { limit: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'exclude',
                                        label: __( 'Exclude (comma-separated IDs)', 'the-permalinks-cascade' ),
                                        value: props.attributes.exclude,
                                        onChange: function ( value ) {
                                            props.setAttributes( { exclude: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'include_only',
                                        label: __( 'Include only (comma-separated IDs)', 'the-permalinks-cascade' ),
                                        value: props.attributes.include_only,
                                        onChange: function ( value ) {
                                            props.setAttributes( { include_only: value } );
                                        }
                                    } )
                                ] )
                            )
                        ]
                    );
                }
            } );

            if ( args.showCustomPostBlock ) {
                blocks.registerBlockType( 'the-permalinks-cascade/custom-post', {
                    apiVersion: 2,
                    icon: 'editor-ul',
                    supports: {
                        html: false,
                        reusable: false,
                        align: false
                    },
                    edit: function ( props ) {
                        var custom_posts_options = data.useSelect( function ( select ) {
                            var custom_posts_opts    = [];
                            const builtin_post_types = [ 'post', 'page', 'attachment' ];
                            const post_types         = select( 'core' ).getPostTypes( { per_page: -1 } );

                            if ( post_types ) {
                                for ( var i = 0; i < post_types.length; i++ ) {
                                    var post_slug = post_types[i].slug;

                                    if ( post_types[i].viewable && !builtin_post_types.includes( post_slug ) ) {
                                        custom_posts_opts.push( { value: post_slug, label: post_types[i].name } );
                                    }
                                }
                            }
                            
                            return custom_posts_opts;
                        }, [] );
                        
                        return el(
                            'div',
                            editor.useBlockProps(),
                            [
                                el( ServerSideRender, {
                                    key: 'server-side-render',
                                    block: 'the-permalinks-cascade/custom-post',
                                    attributes: props.attributes,
                                } ),
                                el( editor.InspectorControls, { key: 'inspector-controls' },
                                    el( components.PanelBody, {
                                        title: __( 'Settings', 'the-permalinks-cascade' ),
                                        initialOpen: true,
                                    }, [
                                        el( components.SelectControl, {
                                            key: 'post_slug',
                                            label: __( 'Post Type', 'the-permalinks-cascade' ),
                                            value: props.attributes.post_slug,
                                            options: [
                                                { value: 'none', label: '— ' + __( 'Select', 'the-permalinks-cascade' ) + ' —' }
                                            ].concat( custom_posts_options ),
                                            onChange: function ( value ) {
                                                props.setAttributes( { post_slug: value } );
                                            }
                                        } ),
                                        el( components.TextControl, {
                                            key: 'title',
                                            label: __( 'Title', 'the-permalinks-cascade' ),
                                            value: props.attributes.title,
                                            onChange: function ( value ) {
                                                props.setAttributes( { title: value } );
                                            }
                                        } ),
                                        el( components.SelectControl, {
                                            key: 'order_by',
                                            label: __( 'Order by', 'the-permalinks-cascade' ),
                                            value: props.attributes.order_by,
                                            options: [
                                                { value: 'post_title',    label: __( 'Title', 'the-permalinks-cascade' ) },
                                                { value: 'post_date',     label: __( 'Most recent', 'the-permalinks-cascade' ) },
                                                { value: 'post_date_asc', label: __( 'Older', 'the-permalinks-cascade' ) }
                                            ],
                                            onChange: function ( value ) {
                                                props.setAttributes( { order_by: value } );
                                            }
                                        } ),
                                        el( components.SelectControl, {
                                            key: 'hierarchical',
                                            label: __( 'Hyper-list style', 'the-permalinks-cascade' ),
                                            value: props.attributes.hierarchical,
                                            options: [
                                                { value: '1', label: __( 'Hierarchical', 'the-permalinks-cascade' ) },
                                                { value: '0', label: __( 'Flat', 'the-permalinks-cascade' ) }
                                            ],
                                            onChange: function ( value ) {
                                                props.setAttributes( { hierarchical: value } );
                                            }
                                        } ),
                                        el( components.TextControl, {
                                            key: 'limit',
                                            label: __( 'Max. number of items', 'the-permalinks-cascade' ),
                                            value: props.attributes.limit,
                                            onChange: function ( value ) {
                                                props.setAttributes( { limit: value } );
                                            }
                                        } ),
                                        el( components.TextControl, {
                                            key: 'exclude',
                                            label: __( 'Exclude (comma-separated IDs)', 'the-permalinks-cascade' ),
                                            value: props.attributes.exclude,
                                            onChange: function ( value ) {
                                                props.setAttributes( { exclude: value } );
                                            }
                                        } ),
                                        el( components.TextControl, {
                                            key: 'include_only',
                                            label: __( 'Include only (comma-separated IDs)', 'the-permalinks-cascade' ),
                                            value: props.attributes.include_only,
                                            onChange: function ( value ) {
                                                props.setAttributes( { include_only: value } );
                                            }
                                        } )
                                    ] )
                                )
                            ]
                        );
                    }
                } );
            }

            blocks.registerBlockType( 'the-permalinks-cascade/taxonomy', {
                apiVersion: 2,
                icon: 'editor-ul',
                supports: {
                    html: false,
                    reusable: false,
                    align: false
                },
                edit: function ( props ) {
                    var taxonomies_options = data.useSelect( function ( select ) {
                        var taxonomies_opts = [];
                        const taxonomies    = select( 'core' ).getTaxonomies( { per_page: -1 } );

                        if ( taxonomies ) {
                            for ( var i = 0; i < taxonomies.length; i++ ) {
                                if ( taxonomies[i].visibility.public ) {
                                    taxonomies_opts.push( { value: taxonomies[i].slug, label: taxonomies[i].name } );
                                }
                            }
                        }
                        
                        return taxonomies_opts;
                    }, [] );

                    return el(
                        'div',
                        editor.useBlockProps(),
                        [
                            el( ServerSideRender, {
                                key: 'server-side-render',
                                block: 'the-permalinks-cascade/taxonomy',
                                attributes: props.attributes,
                            } ),
                            el( editor.InspectorControls, { key: 'inspector-controls' },
                                el( components.PanelBody, {
                                    title: __( 'Settings', 'the-permalinks-cascade' ),
                                    initialOpen: true,
                                }, [
                                    el( components.SelectControl, {
                                        key: 'taxonomy_slug',
                                        label: __( 'Taxonomy', 'the-permalinks-cascade' ),
                                        value: props.attributes.taxonomy_slug,
                                        options: taxonomies_options,
                                        onChange: function ( value ) {
                                            props.setAttributes( { taxonomy_slug: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'title',
                                        label: __( 'Title', 'the-permalinks-cascade' ),
                                        value: props.attributes.title,
                                        onChange: function ( value ) {
                                            props.setAttributes( { title: value } );
                                        }
                                    } ),
                                    el( components.ToggleControl, {
                                        key: 'show_count',
                                        label: __( 'Show count of posts', 'the-permalinks-cascade' ),
                                        checked: props.attributes.show_count,
                                        onChange: function ( value ) {
                                            props.setAttributes( { show_count: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'order_by',
                                        label: __( 'Order by', 'the-permalinks-cascade' ),
                                        value: props.attributes.order_by,
                                        options: [
                                            { value: 'name',  label: __( 'Name', 'the-permalinks-cascade' ) },
                                            { value: 'count', label: __( 'Most used', 'the-permalinks-cascade' ) }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { order_by: value } );
                                        }
                                    } ),
                                    el( components.SelectControl, {
                                        key: 'hierarchical',
                                        label: __( 'Hyper-list style', 'the-permalinks-cascade' ),
                                        value: props.attributes.hierarchical,
                                        options: [
                                            { value: '1', label: __( 'Hierarchical', 'the-permalinks-cascade' ) },
                                            { value: '0', label: __( 'Flat', 'the-permalinks-cascade' ) }
                                        ],
                                        onChange: function ( value ) {
                                            props.setAttributes( { hierarchical: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'limit',
                                        label: __( 'Max. number of items', 'the-permalinks-cascade' ),
                                        value: props.attributes.limit,
                                        onChange: function ( value ) {
                                            props.setAttributes( { limit: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'exclude',
                                        label: __( 'Exclude (comma-separated IDs)', 'the-permalinks-cascade' ),
                                        value: props.attributes.exclude,
                                        onChange: function ( value ) {
                                            props.setAttributes( { exclude: value } );
                                        }
                                    } ),
                                    el( components.TextControl, {
                                        key: 'include_only',
                                        label: __( 'Include only (comma-separated IDs)', 'the-permalinks-cascade' ),
                                        value: props.attributes.include_only,
                                        onChange: function ( value ) {
                                            props.setAttributes( { include_only: value } );
                                        }
                                    } )
                                ] )
                            )
                        ]
                    );
                }
            } );
        }
    };
} )( window.wp );
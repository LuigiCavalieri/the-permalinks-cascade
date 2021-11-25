<?php
namespace ThePermalinksCascade;

/**
 * @package The Permalinks Cascade
 * @copyright Copyright 2021 Luigi Cavalieri.
 * @license https://opensource.org/licenses/GPL-3.0 GPL v3.0
 *
 * @since 2.0
 */
final class HyperlistController {
    /**
     * @since 2.0
     * @var object
     */
    private $plugin;

    /**
     * @since 2.0
     * @var array
     */
    private $blockAttributes = array();

    /**
     * @since 2.0
     * @var array
     */
    private $contentTypes;

    /**
     * @since 2.0
     * @var array
     */
    private $postTypes;

    /**
     * @since 2.0
     * @var array
     */
    private $defaults;

    /**
     * @since 2.0
     * @var bool
     */
    private $blockTypes;

    /**
     * @since 2.0
     * @var bool
     */
    private $doingBlock = false;

    /**
     * @since 2.0
     * @var bool
     */
    private $doingShortcode = false;

    /**
     * @since 2.0
     * @param object $plugin
     */
    public function __construct( $plugin ) {
        $this->plugin     = $plugin;
        $this->blockTypes = array(
            'page' => __( 'Pages', 'the-permalinks-cascade' ),
            'post' => __( 'Posts', 'the-permalinks-cascade' )
        );
    }

    /**
     * Registers the Block Types.
     * 
     * @since 2.0
     */
    public function wpDidFinishLoading() {
        wp_register_script(
            'the-permalinks-cascade-blocks',
            $this->plugin->getMinScriptURL( 'includes/blocks/index', 'js' ),
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-data' ),
            $this->plugin->version(),
            true
        );

        $this->loadBlockAttributes();

        foreach ( $this->blockTypes as $id => $title ) {
            register_block_type( "the-permalinks-cascade/{$id}", array(
                'api_version'     => 2,
                'title'           => $title,
                'category'        => 'the-permalinks-cascade',
                'editor_script'   => 'the-permalinks-cascade-blocks',
                'render_callback' => array( $this, str_replace( '-', '_', "doBlock_{$id}" ) ),
                'attributes'      => $this->blockAttributes[$id]
            ));
        }

        add_filter( 'block_categories_all', function( $categories ) {
            $tpc_category = array(
                'slug'  => 'the-permalinks-cascade',
                'title' => 'The Permalinks Cascade'
            );

            return array_merge( $categories, array( $tpc_category ) );
        });

        $inline_script  = 'ThePermalinksCascade.registerBlocks( { showCustomPostBlock: ';
        $inline_script .= ( isset( $this->blockTypes['custom-post'] )? 'true' : 'false' );
        $inline_script .= ' } );';
        
        wp_add_inline_script( 'the-permalinks-cascade-blocks', $inline_script );
    }

    /**
     * @since 2.0
     *
     * @param array $attributes
     * @param string $the_content
     * @return string
     */
    public function doBlock_page( $attributes, $the_content ) {
        $this->doingBlock = true;

        return $this->getHyperlist( 'page', $attributes );
    }

    /**
     * @since 2.0
     *
     * @param array $attributes
     * @param string $the_content
     * @return string
     */
    public function doBlock_post( $attributes, $the_content ) {
        $this->doingBlock = true;

        return $this->getHyperlist( 'post', $attributes );
    }

    /**
     * @since 2.0
     *
     * @param array $attributes
     * @param string $the_content
     * @return string
     */
    public function doBlock_taxonomy( $attributes, $the_content ) {
        if ( isset( $attributes['taxonomy_slug'] ) ) {
            $this->doingBlock = true;

            return $this->getHyperlist( $attributes['taxonomy_slug'], $attributes );
        }

        return '';
    }

    /**
     * @since 2.0
     *
     * @param array $attributes
     * @param string $the_content
     * @return string
     */
    public function doBlock_custom_post( $attributes, $the_content ) {
        if ( !isset( $attributes['post_slug'] ) || 'none' == $attributes['post_slug'] ) {
            if ( $this->isGutenbergEditor() ) {
                $message = __( 'please, select a Post Type from the settings panel.', 'the-permalinks-cascade' );

                return '<p><em><strong style="color:#d75b00">' 
                     . __( 'Notice:', 'the-permalinks-cascade' ) 
                     . '</strong> ' . $message . '</em></p>';
            }

            return '';
        }

        $this->doingBlock = true;

        return $this->getHyperlist( $attributes['post_slug'], $attributes );
    }

    /**
     * @since 2.0
     * @return bool
     */
    private function isGutenbergEditor() {
        return (
            defined( 'REST_REQUEST' ) && 
            true === REST_REQUEST && 
            'edit' === filter_input( INPUT_GET, 'context', FILTER_SANITIZE_STRING )
        );
    }

    /**
     * @since 2.0
     * @return bool
     */
    private function loadBlockAttributes() {
        $sections = $this->plugin->invokeGlobalObject( 'DataController' )->loadPageSections( 'site_tree', true );
        
        $default_str_attr   = array(
            'type'    => 'string',
            'default' => ''
        );
        $default_limit_attr = array(
            'type'    => 'string',
            'default' => '100'
        );

        foreach ( $this->blockTypes as $content_type_id => $title ) {
            $fields = $sections[$content_type_id]->getFieldsFromDictionary();

            foreach ( $fields as $field ) {
                switch ( $field->viewClass() ) {
                    case 'Checkbox':
                        $attr_type = 'boolean';
                        break;

                    case 'Dropdown':
                        $attr_type = ( $field->dataType() == 'boolean_choice' ? 'boolean' : 'string' );
                        break;

                    default:
                        $attr_type = 'string';
                        break;
                }

                $this->blockAttributes[$content_type_id][$field->id()] = array(
                    'type'    => $attr_type,
                    'default' => $field->defaultValue()
                );
            }

            $this->blockAttributes[$content_type_id]['limit'] = $default_limit_attr;
            $this->blockAttributes[$content_type_id]['exclude'] = $default_str_attr;
            $this->blockAttributes[$content_type_id]['include_only'] = $default_str_attr;
        }

        $this->loadContentTypes();

        if ( count( $this->postTypes ) > 2 ) {
            $this->blockTypes['custom-post']      = __( 'Custom Posts', 'the-permalinks-cascade' );
            $this->blockAttributes['custom-post'] = array(
                'post_slug'    => array(
                    'type'    => 'string',
                    'default' => 'none'
                ),
                'title'        => $default_str_attr,
                'order_by'     => array(
                    'type'    => 'string',
                    'default' => 'post_title'
                ),
                'hierarchical' => array(
                    'type'    => 'string',
                    'default' => '1'
                ),
                'limit'        => $default_limit_attr,
                'exclude'      => $default_str_attr,
                'include_only' => $default_str_attr,
            );
        }

        $this->blockTypes['taxonomy']      = __( 'Terms', 'the-permalinks-cascade' );
        $this->blockAttributes['taxonomy'] = array(
            'taxonomy_slug'    => array(
                'type'    => 'string',
                'default' => 'category'
            ),
            'title'        => $default_str_attr,
            'show_count'   => array(
                'type'    => 'boolean',
                'default' => false
            ),
            'order_by'     => array(
                'type'    => 'string',
                'default' => 'name'
            ),
            'hierarchical' => array(
                'type'    => 'string',
                'default' => '1'
            ),
            'limit'        => $default_limit_attr,
            'exclude'      => $default_str_attr,
            'include_only' => $default_str_attr,
        );
    }

    /**
     * @since 2.0
     *
     * @param array $attributes
     * @return string
     */
    public function doShortcode( $attributes ) {
        if (! isset( $attributes['type'] ) ) {
            return '';
        }

        $this->doingShortcode = true;
        
        return $this->getHyperlist( $attributes['type'], $attributes );
    }

    /**
     * @since 2.0
     *
     * @param string $type
     * @param array $arguments
     * @return string
     */
    public function getHyperlist( $type, $arguments = array() ) {
        $type = sanitize_key( $type );

        $this->loadContentTypes();

        if (! isset( $this->contentTypes[$type] ) ) {
            return '';
        }

        $this->loadDefaults();

        $content_type = $this->contentTypes[$type];

        if ( $this->doingShortcode ) {
            $list_options = shortcode_atts( $this->defaults[$content_type], $arguments, 'permalinks-cascade' );   
        }
        else {
            $list_options = wp_parse_args( $arguments, $this->defaults[$content_type] );
        }

        if ( 'page' == $content_type ) {
            if ( 
                $this->doingShortcode && 
                isset( $list_options['only_children_of'] ) && 
                ( 'this' == $list_options['only_children_of'] )
            ) {
                global $post;

                if ( 'page' == $post->post_type ) {
                    $list_options['only_children_of'] = $post->ID;
                }
            }  
        }

        $builder = $this->plugin->invokeGlobalObject( 'SiteTreeBuilder' );
        $builder->setDoingHyperlist( true );
        $builder->setDoingBlock( $this->doingBlock );
        $builder->setDoingShortcode( $this->doingShortcode );

        return $builder->buildList( $content_type, $list_options );
    }

    /**
     * @since 2.0
     * @return bool
     */
    private function loadContentTypes() {
        if ( $this->contentTypes ) {
            return false;
        }

        $this->contentTypes = array(
            'post'     => 'post',
            'page'     => 'page',
            'category' => 'category',
            'post_tag' => 'post_tag',
            'author'   => 'authors'
        );

        $this->postTypes = array(
            'post' => 'post',
            'page' => 'page'
        );

        $post_types = get_post_types( array( 'public' => true, '_builtin' => false ) );
        $taxonomies = get_taxonomies( array( 'public' => true, '_builtin' => false ) );

        foreach ( $post_types as $post_type ) {
            $this->postTypes[$post_type]    = $post_type;
            $this->contentTypes[$post_type] = $post_type;
        }

        foreach ( $taxonomies as $taxonomy ) {
            $this->contentTypes[$taxonomy] = $taxonomy;
        }

        return true;
    }

    /**
     * @since 2.0
     * @return bool
     */
    private function loadDefaults() {
        if ( $this->defaults ) {
            return false;
        }

        $defaults_for_page = $this->plugin->invokeGlobalObject( 'DataController' )->defaultsForPage( 'site_tree', '', true );

        $this->defaults = &$defaults_for_page['site_tree'];

        foreach ( $this->contentTypes as $content_type ) {
            $this->defaults[$content_type]['show_title'] = true;

            if ( isset( $this->postTypes[$content_type] ) ) {
                $this->defaults[$content_type]['exclude']      = '';
                $this->defaults[$content_type]['include_only'] = '';

                if ( $this->doingShortcode ) {
                    $this->defaults[$content_type]['include_globally_excluded'] = false;
                }
            }

            if (! isset( $this->defaults[$content_type]['limit'] ) ) {
                $this->defaults[$content_type]['limit'] = 100;
            }
        }

        $this->defaults['page']['only_children_of'] = 0;

        return true;
    }
}
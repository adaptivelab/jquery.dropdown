;(function ( $, window, document, undefined ) {

    var pluginName = "dropdown",
        defaults = {};

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var $element,
                dropdown,
                dropdownActive,
                dropdownOptions,
                open;

            dropdown = this.generateDropdown( this.element, this.options );

            dropdownActive = dropdown.find( '.active' );
            dropdownOptions = dropdown.find( '.options' );

            dropdownOptions.hide();
            open = false;

            dropdownActive.bind(
                'click',
                this.handleActiveClick.bind( this )
            );

            dropdownOptions.find( '.option' ).
                bind(
                    'click',
                    this.handleOptionClick.bind( this )
                );

            $( 'html' ).bind( 'click', this.hideOptions.bind( this ) );

            $element = $( this.element );
            $element.hide();
            $element.after( dropdown );

            this.$element = $element;
            this.dropdown = dropdown;
            this.dropdownActive = dropdownActive;
            this.dropdownOptions = dropdownOptions;
            this.open = open;
        },

        handleActiveClick: function( e ) {
            e.preventDefault();
            e.stopPropagation();

            this.toggleOptions();
        },

        handleOptionClick: function( e ) {
            var $el,
                val,
                display;

            e.preventDefault();
            e.stopPropagation();

            $el = $( e.srcElement );
            val = $el.attr( 'data-value' );
            display = $el.text();

            this.dropdownActive.html( display );

            this.$element.val( val );
            this.hideOptions();
        },

        toggleOptions: function() {
            if( this.open ) {
                this.hideOptions();
            } else {
                this.showOptions();
            }
        },

        showOptions: function() {
            this.open = true;
            this.dropdownOptions.show();
        },

        hideOptions: function() {
            this.open = false;
            this.dropdownOptions.hide();
        },

        generateDropdown: function( element, options ) {
            var dropdown,
                dropdownActive,
                dropdownOptions;

            dropdownActive = '';
            dropdownOptions = '';

            $( element ).find( 'option' ).each( function( i, el ) {
                var $el,
                    val,
                    display,
                    html;

                $el = $(el);
                val = $el.val();
                display = $el.text();

                html = '<div class="option" data-value="' + val + '">' + display + '</div>';

                if( i === 0 ) {
                    dropdownActive = display; // Assume first is the active one on initialisation
                }

                dropdownOptions = dropdownOptions + html;
            });

            dropdown = $(
                '<div class="dropdown">' +
                '    <div class="active">' +
                        dropdownActive +
                '    </div>' +
                '    <div class="options">' +
                '       <div class="select">' +
                            dropdownOptions +
                '       </div>'+
                '    </div>' +
                '</div>'
            );

            return dropdown;
        }

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

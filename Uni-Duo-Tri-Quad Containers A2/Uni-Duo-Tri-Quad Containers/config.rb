# require "compass"
# Require any additional compass plugins here.


# Set this to the root of your project when deployed:

# sass_path = File.dirname(__FILE__)
# css_path = File.join(sass_path, '..', 'css')
# images_dir = File.join(sass_path, '..', 'images')



http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
generated_images_dir = "images/sprites"
javascripts_dir = "scripts"
fonts_dir = "font"



# Sass::Plugin.options[:debug_info] = true


# sass_options = {:debug_info => true}

sass_options =  (environment == :production) ? {:debug_info => false} : {:debug_info => true}
output_style = (environment == :production) ? :compressed : :expanded




# output_style = :nested
line_comments = false

# asset_cache_buster :none

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
preferred_syntax = :scss
 
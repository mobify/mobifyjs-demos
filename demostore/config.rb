require 'pathname'

# Require any additional compass plugins here.
# Set this to the root of your project when deployed:


http_path = "/"
css_dir = "."
sass_dir = "scss"
images_dir = "i"
javascripts_dir = "js"
# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
project_path = "src"

if environment != :production
      sass_options = {:debug_info => true}
end

npm_root = `npm -g root`.strip
mobify_js_version = "1.1"
base_path = Pathname.new(npm_root).join("mobify-client", "vendor", "mobify-js", mobify_js_version)
add_import_path  base_path.to_s

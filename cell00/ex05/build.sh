for folder_name in "$@"; do
        new_folder_name="ex${folder_name}"
        mkdir "$new_folder_name"
        if [ $? -eq 0 ]; then
            echo "Created folder: $new_folder_name"
        else
            echo "Error creating folder: $new_folder_name"
        fi
    done
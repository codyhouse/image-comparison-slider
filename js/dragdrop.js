jQuery(document).ready(function($){

    if (typeof window.FileReader !== 'undefined') {
      setupListeners();
    }

    function setupListeners () {
        $('.cd-original-drop-zone')
        .on('drop', null, $('.cd-original-image'), originalDrop)
        .on('dragover', dragover)
        .on('dragleave', dragleave)
        .on('dragend', dragleave);

        $('.cd-modified-drop-zone').on('drop', null, $('.cd-modified-image'), originalDrop)
        .on('dragover', dragover)
        .on('dragleave', dragleave)
        .on('dragend', dragleave);
        
        function dragleave (e) {
            $(this).removeClass('cd-drop-zone-hover');
        }

        function dragover (e) {
            e.stopPropagation();
            e.preventDefault();

            $(this).addClass('cd-drop-zone-hover');
        }
    }

    function originalDrop (e) {
        e.preventDefault();

        var elem = $(this);
        var file = (e.target.files || (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files))[0];

        var reader = new FileReader();
        reader.onload = function (event) {
            e.data.attr('src', event.target.result);
            // remove hover css class after setting image.
            // doing it earlier causes a flicker
            elem.removeClass('cd-drop-zone-hover');
        };
        reader.readAsDataURL(file);
    }
});
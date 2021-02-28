/* ---- particles.js config ---- */

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "polygon": {
                "nb_sides": 350
            },
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 140,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "retina_detect": true
});

$("#check").on("keydown", function search(e) {
    // Dynamic field resizing
    var value = $(this).val();
    var size = value.length;
    size = size * 2;
    $(this).css('width', size * 3 + 200);

    if (e.keyCode == 13) {
        processInput($("#check").val())
    }
});

window.onhashchange = function() {
    var input = document.location.hash;
    processInput(input.replace('#', ''))
}

function processInput(input) {

    input = input.trim();
    $("#check").val(input);

    if (input != '') {
        let output;
        $("span.fat").html('<i class="fa fa-cog fa-spin fa-fw"></i><span class="sr-only">Loading...</span>')
        $.ajax("https://cfwho.com/api/v1/" + input)
            .done(function(data, status, xhr) {
                if (data.success == false) {
                    output = data.message;
                } else {
                    output = data.results[0].contacts.abuse[0];
                }
            })
            .fail(function(data, status, xhr) {
                if (xhr.status == 404) {
                    output = ""
                }

                data = data.responseJSON;
                if (data.success == false) {
                    output = data.message;
                } else {
                    output = data[input].contacts.abuse[0];
                }
            })
            .always(function() {
                document.location.hash = input;
                $("span.fat").html(output);
            });
    }
}

$("#check").focus();
if (document.location.hash != '') {
    processInput(document.location.hash.replace('#', ''))
}
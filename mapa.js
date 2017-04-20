function mapaedita(objeto) {
    //VARIÁVEIS GLOBAIS
    var googleLayer =  L.gridLayer.googleMutant({
        type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    });
    // var map = L.map('map', {zoom: 5, center: [-18.9237669244,-48.1787759866]});
    var map = new L.Map('map', {center: new L.LatLng(-18.9237669244,-48.1787759866), zoom: 5});
    map.addLayer(googleLayer);
    var dados_propriedades = '';
    var drawControl = '';
    var atual = ''; 
    var propriedade = objeto;

    //ATUALIZANDO O CONTROL DE DRAW
    function atualiza_editar_propriedade(mapa, camadas){
        if (drawControl!=='') {
            mapa.removeControl(drawControl);
        }
        drawControl = new L.Control.Draw({
            edit: {
                featureGroup: camadas,
                remove: false
            },
            draw: {
                polyline: false,
                rectangle: false,
                marker: false,
                circle: false,
            }
        });
        mapa.addControl(drawControl);
    }

    //DESENHANDO A CAMADA NO MAPA
    function preenche_dados_propriedades(mapa, dados, camada_atual) {
        var layers_propriedade = new L.FeatureGroup();

        if (dados!='') {
            if(camada_atual!='') {
                mapa.removeLayer(camada_atual);
            }
            var geom=dados.geometry; 
            var props=dados.properties;
            var valido = true;
            try {
            var polygon_json = L.geoJson(dados, {
                onEachFeature: function (feature, layer) {
                    layers_propriedade.addLayer(layer);
                }
            });
            } catch(e) {
                valido = false;
            }

            if (valido) {
                string = stringify(dados);
                $("#id_geometria").val(string);
                layers_propriedade.addTo(mapa);
                mapa.fitBounds(layers_propriedade.getBounds());

                atualiza_editar_propriedade(mapa, layers_propriedade);
                return layers_propriedade;
            } else {
                alert('Geometria Inválida. Detalhes: '+e);
                return '';
            }
        } else {
            drawControl = new L.Control.Draw({
                edit: false,
                draw: {
                    polyline: false,
                    rectangle: false,
                    marker: false,
                    circle: false,
                }
            });
            mapa.addControl(drawControl);
            return '';
        }

    }

    //INSTANCIANDO PROPRIEDADE INICIAL
    if (propriedade !== null) {
        atual = preenche_dados_propriedades(map, $("#id_geometria").val(), atual);
    } else {
        atual = preenche_dados_propriedades(map, '', atual);
    }
    

    //EVENTO PARA POLIGONO EDITADO E SALVO
    map.on('draw:edited', function (e) {
        geojson = e.layers.getLayers()[0].toGeoJSON();
        atual = preenche_dados_propriedades(map, geojson, atual);
    });

    map.on('draw:created', function (e) {
        geojson = e.layer.toGeoJSON();
        atual = preenche_dados_propriedades(map, geojson, atual);
    });

}